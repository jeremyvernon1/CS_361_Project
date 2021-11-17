function convert() {
    //const puppeteer = require('puppeteer');
    const receiveAmount = 1;
    const receiveCountry = document.getElementById("toCurrency").innerHTML;
    var found = false;

    // Class for country, rate, and currency type
    class Rates {
        constructor(countryName, rate, currency) {
            this.countryName = countryName;
            this.rate = rate;
            this.currency = currency;
        }
    }

    function properCase(string) {
        string = string.toLowerCase();
        string = string.charAt(0).toUpperCase() + string.slice(1);
        return string;
    }

    async function scrapeProduct(url) {
        // Initialize scraper
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // Get info
        for (let i = 1; i < 24; i++) {
            // Get country
            var elCountryUrl = 'html/body/div[3]/table/tbody/tr[' + i + ']/th';
            [el] = await page.$x(elCountryUrl);
            txt = await el.getProperty('innerText');
            country = await txt.jsonValue();
            /* Remove astericks. Used from stackoverflow.com/questions/4564414/
            delete-first-character-of-a-string-in-javascript */
            while(country.charAt(0) == '*') {
                country = country.substring(1);
            }

            if (receiveCountry.toLowerCase() == country.toLowerCase()) {
                found = true;
                country = properCase(country);

                // Get converstion rate
                var elRateUrl = '//*[@id="content"]/table/tbody/tr[' + i + ']/td[2]';
                [el] = await page.$x(elRateUrl);
                txt = await el.getProperty('innerText');
                var rate = Number(await txt.jsonValue());
                
                // Get country currency
                var elcurrencyUrl = '//*[@id="content"]/table/tbody/tr[' + i + ']/td[1]';
                [el] = await page.$x(elcurrencyUrl);
                txt = await el.getProperty('innerText');
                var currency = await txt.jsonValue();
                // Pluralize and format name of currency
                if (rate != 1) {
                    currency = currency + "s";
                }
                currency = properCase(currency);

                // Convert
                const returnCurrAmount = receiveAmount * rate;

                // Display
                console.log("\n", returnCurrAmount, currency, "\n");
            }
        }

        if (!found) {
            console.log("\nSorry. Country not found.\n");
        }

        // End session
        await browser.close();
    }

    // Run scraper
    scrapeProduct('https://www.federalreserve.gov/releases/h10/current/');
}
