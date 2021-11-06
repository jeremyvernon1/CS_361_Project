const puppeteer = require('puppeteer');
const receiveAmount = 1;
const receiveCurrency = "VENEZUELA";
var conversionFactor = 0;
const countryArr = [];

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
        // Get converstion rate
        var elRateUrl = '//*[@id="content"]/table/tbody/tr[' + i + ']/td[2]';
        var [el] = await page.$x(elRateUrl);
        var txt = await el.getProperty('innerText');
        var rate = await txt.jsonValue();
        
        // Get country
        var elcountryUrl = 'html/body/div[3]/table/tbody/tr[' + i + ']/th';
        [el] = await page.$x(elcountryUrl);
        txt = await el.getProperty('innerText');
        country = await txt.jsonValue();
        /* Remove astericks. Used from stackoverflow.com/questions/4564414/
        delete-first-character-of-a-string-in-javascript */
        while(country.charAt(0) == '*') {
            country = country.substring(1);
        }
        country = properCase(country);

        // Get country currency
        var elcurrencyUrl = '//*[@id="content"]/table/tbody/tr[' + i + ']/td[1]';
        [el] = await page.$x(elcurrencyUrl);
        txt = await el.getProperty('innerText');
        currency = await txt.jsonValue();
        // Pluralize and format name of currency
        if (rate != 1) {
            currency = currency + "s";
        }
        currency = properCase(currency);

        // Save results in array
        countryArr[i - 1] = new Rates(country, Number(rate), currency)
        //rates.set(country.toLowerCase(), Number(rate));
    }
    
    // 
    for (i = 0; i < (countryArr.length); i++) {
        if (receiveCurrency.toLowerCase() == countryArr[i].countryName.toLowerCase()) {
                // Convert
                conversionFactor = countryArr[i].rate;
                const returnCurrAmount = receiveAmount * conversionFactor;
                const returnCurrType = countryArr[i].currency;

                // Display
                console.log("\n", returnCurrAmount, returnCurrType, "\n");
        }
    }

    // End session
    await browser.close();
}

// Run scraper
scrapeProduct('https://www.federalreserve.gov/releases/h10/current/');
