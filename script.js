const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defalutLayout:'main'});
const mysql = require('./dbcon.js');

// Engines
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.set('port', process.argv[2]);

// SQL Queries
function getAirportsByState(res, mysql, selectedState, context){
    var callbackCount = 0;
    mysql.pool.query("SELECT name, ID, ident FROM airports WHERE iso_region = " + selectedState,
        function(error, results){
            if(error){
                console.log("Error in mySQL.", error);
            }
            context.airports = results;
            callbackCount++;
            if (callbackCount > 0) {
                res.render('sitePage1', context, largeAirports);
        }
    })
};

function buildStateLists(context) {

    const stateAbbreviations = [
        'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
        'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
        'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
        'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
        'VT','VI','VA','WA','WV','WI','WY'
       ];
    
    // Creates an empty list for each state 
    for (i = 0; i < stateAbbreviations.length; i++) {
        eval("context." + stateAbbreviations[i] + "= {}");
    }
    
    // Loops through each entry of large airports and adds it to the appropriate state list
    k = 0;
    for (i = 0; i < context.length; i++) {
        for (j = 0; j < stateAbbreviations.length; j++) {
            if (context[i].iso_region == "US-" + stateAbbreviations[j]) {
                eval("context." + stateAbbreviations[j] + "[k] = context[i]");
                k++;
            }
        }
    }
    return context;
}

function getLargeAirports(res, mysql, context){
    var callbackCount = 0;
    mysql.pool.query("SELECT name, ID, ident, iso_region FROM airports \
    WHERE type = 'large_airport'",
        function(error, results){
            if(error){
                console.log("Error in mySQL.", error);
            }
            context = buildStateLists(results);
            callbackCount++;
            if (callbackCount > 0) {
                res.render('sitePage2', context);
        }
    })
};

function getAirportsBySearch(res, mysql, searchString, context){
    var callbackCount = 0;
    mysql.pool.query("SELECT name, ID, ident FROM airports WHERE name LIKE " + searchString,
        function(error, results){
            if(error){
                console.log("Error in mySQL.", error);
            }
            context.airports = results;
            callbackCount++;
            if (callbackCount > 0) {
                res.render('sitePage1', context);
        }
    })
};

function getAirportsByID(res, mysql, selectedResults, context){
    var callbackCount = 0;

    mysql.pool.query("SELECT * FROM airports WHERE ID in (" + selectedResults + ")",
        function(error, results){
            if(error){
                console.log("Error in mySQL.", error);
            }
            context.airports = results;
            callbackCount++;
            if (callbackCount > 0) {
                res.render('sitePage3', context);
            }
        }
    )
};

// Renders pages
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sitePage1', (req, res) => {
    var context = {};
    var mysql = req.app.get('mysql');
    if (req.query.airportSearch) {
        var searchString = "'" + req.query.airportSearch + "%" + "'";
        getAirportsBySearch(res, mysql, searchString, context);
    }
    if (req.query.stateSearch) {
        var selectedState = "'" + req.query.stateSearch + "'";
        getAirportsByState(res, mysql, selectedState, context);
    }
});

app.get('/sitePage2', (req, res) => {
    var context = {};
    var mysql = req.app.get('mysql');
    getLargeAirports(res, mysql, context);
});

app.get('/sitePage3', (req, res) => {
    var context = {};
    var mysql = req.app.get('mysql');
    var selectedResults = Object.values(req.query);
    getAirportsByID(res, mysql, selectedResults, context);
    if (!req.query.airport0) {
        res.render('sitePage3'); // No results found page?
    }
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((req, res) => {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on: ' + app.get('port') + '. Press Ctrl+C to terminate.');
});
