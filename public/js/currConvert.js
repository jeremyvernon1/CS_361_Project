const puppeteer = require('puppeteer');
const receiveCurrency = 0;
const returnCurrency = 0;
var conversionFactor = 0;

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el0] = await page.$x('//*[@id="imgBlkFront"]');
    const src = await el0.getProperty('src');
    const imgUrl = await src.jsonValue();
   
    const [el1] = await page.$x('//*[@id="productTitle"]');
    const txt0 = await el1.getProperty('textContent');
    const title = await txt0.jsonValue();
   
    const [el2] = await page.$x('//*[@id="corePrice_feature_div"]/div/span/span[2]');
    const txt1 = await el2.getProperty('textContent');
    const price = await txt1.jsonValue();

    console.log({imgUrl, title, price});

    browser.close();
}

scrapeProduct('https://smile.amazon.com/Black-Swan-Impact-Improbable-Incerto/dp/1400063515/ref=sr_1_2?crid=39DIQJF7GMN8V&keywords=black+swan+book&qid=1636200890&qsid=137-3588002-2554333&sprefix=black+swan+book%2Caps%2C148&sr=8-2&sres=081297381X%2C1400063515%2C0967375517%2CB081QQMG6Y%2CB08PJWKW4W%2CB00HEU3P8S%2CB07YGNX1HQ%2CB07MF4VTXN%2CB01APIXTJ0%2CB00BH68UCG%2CB01EXOKBZW%2C0778311074%2C0399590455%2CB075L5J1K2%2C1737419807%2C0312428243&srpt=ABIS_BOOK');


// Conversion Rates
conversionFactor = 0.5;

// Convert input into digit


// Convert into new currency
if (!receiveCurrency) {
    console.log("\ninput currency not received.\n");
}
else {
    returnCurrency = receiveCurrency * conversionFactor;
}
