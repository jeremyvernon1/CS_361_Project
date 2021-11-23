// Declare variables
const locationValue = "Here";
const gpsValue = "GPS Coordinates";
const elevation = "Elevation value";
var landingFee = "$250.00";
const trafficValue = "High";
const photo1 = "Photo of Airport 1";
const photo2 = "Photo of Airport 2";
const photo3 = "Photo of Airport 3";
const distance1 = 50;
const distance2 = 100;
const distance3 = 75;
var airport1Info = "Airport 1 Info from teammate's Wikipedia scraper."; //"Airport 1 Info from teammate's Wikipedia scraper."
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

function getAirports(res, mysql, context, complete){
    mysql.pool.query("SELECT * FROM airports", function(error, results, fields){
        // SELECT customer_id as id, first_name, last_name, birthdate, street, city, state, zip, phone
        // FROM Customers WHERE customer_id = ?";
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.airports  = results;
        complete();
    });
}

// Insert content from variables into HTML output
// Stats block
    // Location
if(locationValue !== null) {
    for (var i= 0; i < document.getElementsByClassName('location-value').length; i++) {
        document.getElementsByClassName('location-value')[i].textContent = locationValue;
    }
};
    
    // GPS
if(gpsValue !== null) {
    for (var i= 0; i < document.getElementsByClassName('gps-value').length; i++) {
        document.getElementsByClassName('gps-value')[i].textContent = gpsValue;
    }};
    
    // Elevation
if(elevation !== null) {
    for (var i= 0; i < document.getElementsByClassName('elevation-value').length; i++) {
        document.getElementsByClassName('elevation-value')[i].textContent = elevation;
    }};

    // Landing Fee
if(landingFee !== null) {
    for (var i= 0; i < document.getElementsByClassName('landing-fee-value').length; i++) {
        document.getElementsByClassName('landing-fee-value')[i].textContent = landingFee.amount;
    }};
    
    // Traffic
if(trafficValue !== null) {
    for (var i= 0; i < document.getElementsByClassName('traffic-value').length; i++) {
        document.getElementsByClassName('traffic-value')[i].textContent = trafficValue;
    }};

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

    // Distance between Airport 1 and Airport 3
if(distance2 !== null) {
    for (var i= 0; i < document.getElementsByClassName('distance-value-2').length; i++) {
    document.getElementsByClassName('distance-value-2')[i].textContent = distance2;
}};

    // Distance between Airport 2 and Airport 3
if(distance3 !== null) {
    for (var i= 0; i < document.getElementsByClassName('distance-value-3').length; i++) {
    document.getElementsByClassName('distance-value-3')[i].textContent = distance3;
}};

async function wikiGet(num, wikiUrl) {
    const scraperUrl = 
    'http://flip3.engr.oregonstate.edu:6231/?article=';

    let response = await fetch(scraperUrl + wikiUrl);
    airportInfo = await response.json();
    for (var i= 0; i < document.getElementsByClassName('airport-info-1').length; i++) {
        document.getElementsByClassName('airport-info-' + num)[i].textContent = airportInfo.info;
    };
};

// Airport Info
    // Airport 1
if(airport1Info !== null) {
    var wikiUrl1 = 'Montgomery_Regional_Airport';
    wikiGet(1, wikiUrl1);
};
    
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
