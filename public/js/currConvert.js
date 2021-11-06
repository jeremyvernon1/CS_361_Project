const puppeteer = require('puppeteer');
const receiveAmount = 1;
const receiveCurrency = "australia";
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

        // Get country currency
        var elcurrencyUrl = '//*[@id="content"]/table/tbody/tr[' + i + ']/td[1]';
        [el] = await page.$x(elcurrencyUrl);
        txt = await el.getProperty('innerText');
        currency = await txt.jsonValue();

        // Save results in map
        countryArr[i - 1] = new Rates(country.toLowerCase(), Number(rate), currency.toLowerCase())
        //rates.set(country.toLowerCase(), Number(rate));
    }
    
    // Convert
    conversionFactor = countryArr[0].rate;
    const returnCurrency = receiveAmount * conversionFactor;

    // Display
    console.log("\n", returnCurrency, "\n");

    // End session
    await browser.close();
}

// Run scraper
scrapeProduct('https://www.federalreserve.gov/releases/h10/current/');
