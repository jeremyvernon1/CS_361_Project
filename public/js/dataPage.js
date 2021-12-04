// Declare variables
const MAX_RESULTS = 3;
var landingFee = "$250.00"; /* Hack: Was not able to find a SQL database or large
                                publication of landing fees. Plan to update in the future. */
var airportInfo = "";
const emptyString = "No Wikipedia article available for this airport.";

async function convert(i) {
    // Uses Microservice
    const getCountries = document.getElementById("toCurrency" + i);
    const receiveCountry = getCountries.options[getCountries.selectedIndex].value
    
    const baseConvertUrl = 'http://flip3.engr.oregonstate.edu:4241/?';
    var convertUrl = baseConvertUrl + receiveCountry + "=" + 250
    
    let response2 = await fetch(convertUrl);

    landingFee = await response2.json();
        document.getElementById('landing_fee_value' + i).textContent = 
            landingFee.amount + " " + landingFee.currency;
};

// Insert content from variables into HTML output
    // Landing fee
for (var i= 0; i < 3; i++) {
    if (document.getElementById('landing_fee_value' + i)) {
        document.getElementById('landing_fee_value' + i).textContent = landingFee;
    }
};

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

    let response = await fetch(scraperUrl + wikiUrl + "&images=y");
    airportInfo = await response.json();
    document.getElementById('airport-info-' + num).textContent = airportInfo.info;
    img = document.createElement('img');
    img.src = airportInfo.images;
    document.getElementById('photo-' + num).appendChild(img);
};

// Airport Info
function getWikiArticle(i) {
    var wikiUrl = document.getElementById("wikiInfo" + i).textContent;
    wikiUrl = wikiUrl.trim();
    if(wikiUrl != "") {
        wikiUrl = wikiUrl.slice(30);
        wikiGet(i, wikiUrl);
    } else {
        if (document.getElementById('wikiInfo' + i)) {
            document.getElementById('wikiInfo' + i).textContent = emptyString;
            document.getElementById('photo-' + i).textContent = "No photo available.";
        }
    }
};

    // Get Wikipedia article for airports
for (i = 0; i < MAX_RESULTS; i++) {
    getWikiArticle(i);
}
