// Declare variables
var landingFee = "$250.00";
const photo1 = "Photo of Airport 1";
const photo2 = "Photo of Airport 2";
const photo3 = "Photo of Airport 3";
const distance1 = 50;
const distance2 = 100;
const distance3 = 75;
var wikiUrl1 = document.getElementById("wikiInfo").textContent;
var airport1Info = "";
const airport2Info = "Airport 2 Info from teammate's Wikipedia scraper.";
const airport3Info = "Airport 3 Info from teammate's Wikipedia scraper.";

async function convert() {
    const getCountries = document.getElementById("toCurrency");
    const receiveCountry = getCountries.options[getCountries.selectedIndex].value
    
    const baseConvertUrl = 'http://flip3.engr.oregonstate.edu:4241/?';
    var convertUrl = baseConvertUrl + receiveCountry + "=" + 250
    
    let response2 = await fetch(convertUrl);

    landingFee = await response2.json();
    for (var i= 0; i < document.getElementsByClassName('landing-fee-value').length; i++) {
        document.getElementsByClassName('landing-fee-value')[i].textContent = 
            landingFee.amount + " " + landingFee.currency;
    };
};

// Insert content from variables into HTML output
for (var i= 0; i < document.getElementsByClassName('landing-fee-value').length; i++) {
    document.getElementsByClassName('landing-fee-value')[i].textContent = landingFee;
};

// Photo
    // Photo in Airport 1
if(photo1 !== null) {
    for (var i= 0; i < document.getElementsByClassName('photo-1').length; i++) {
    document.getElementsByClassName('photo-1')[i].textContent = photo1;
    }};
     
    // Photo in Airport 2
if(photo2 !== null) {
    for (var i= 0; i < document.getElementsByClassName('photo-2').length; i++) {
    document.getElementsByClassName('photo-2')[i].textContent = photo2;
    }};
 
    // Photo in Airport 3
    if(photo3 !== null) {
        for (var i= 0; i < document.getElementsByClassName('photo-3').length; i++) {
        document.getElementsByClassName('photo-3')[i].textContent = photo3;
        }};

// Distance
    // Distance between Airport 1 and Airport 2
if(distance1 !== null) {
    for (var i= 0; i < document.getElementsByClassName('distance-value-1').length; i++) {
    document.getElementsByClassName('distance-value-1')[i].textContent = distance1;
}};

async function wikiGet(num, wikiUrl) {
    const scraperUrl = 
    'http://flip3.engr.oregonstate.edu:6231/?article=';

    let response = await fetch(scraperUrl + wikiUrl);
    airportInfo = await response.json();
    for (var i= 0; i < document.getElementsByClassName('airport-info-1').length; i++) {
        document.getElementsByClassName('airport-info-1')[i].textContent = airportInfo.info;
    };
};

// Airport Info
    // Airport 1
if(wikiUrl1 !== "") {
    wikiUrl1 = wikiUrl1.trim();
    wikiUrl1 = wikiUrl1.slice(30);
    console.log("wikiUrl1: ", wikiUrl1);
    wikiGet(1, wikiUrl1);
} else {
    console.log("Empty string detected.");
}
    
    // Airport 2
if(airport2Info !== null) {
    var wikiUrl2 = 'Huntsville_International_Airport';
    wikiGet(2, wikiUrl2);
};
    
    // Airport 3
if(airport3Info !== null) {
    var wikiUrl3 = 'Anchorage_International_Airport';
    wikiGet(3, wikiUrl3);
};
