// Declare variables
var landingFee = "$250.00";
const photo1 = "Photo of Airport 1";
const photo2 = "Photo of Airport 2";
const photo3 = "Photo of Airport 3";
const distance1 = 50;
const distance2 = 100;
const distance3 = 75;
var airportInfo = "";
const emptyString = "No Wikipedia article available for this airport.";

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
    // Landing fee
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

// Distance between Airport 2 and Airport 3
if(distance1 !== null) {
    for (var i= 0; i < document.getElementsByClassName('distance-value-2').length; i++) {
    document.getElementsByClassName('distance-value-2')[i].textContent = distance2;
}};

// Wikipedia Info -from teammate's microservice
async function wikiGet(num, wikiUrl) {
    const scraperUrl = 
    'http://flip3.engr.oregonstate.edu:6231/?article=';

    let response = await fetch(scraperUrl + wikiUrl);
    airportInfo = await response.json();
    for (var i= 0; i < document.getElementsByClassName('airport-info-' + num).length; i++) {
        document.getElementsByClassName('airport-info-' + num)[i].textContent = airportInfo.info;
    };
};

// Airport Info
function getWikiArticle(i) {
    var wikiUrl = document.getElementById("wikiInfo" + i).textContent;
    wikiUrl = wikiUrl.trim();
    if(wikiUrl != "") {
        wikiUrl = wikiUrl.slice(30);
        console.log("wikiUrl: ", wikiUrl);
        wikiGet(i, wikiUrl);
    } else {
        document.getElementById('wikiInfo' + i).textContent = emptyString;
    }
};

    // Airport 1
getWikiArticle(0);
    
    // Airport 2
getWikiArticle(1);
    
    // Airport 3
getWikiArticle(2);
