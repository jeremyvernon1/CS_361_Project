const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defalutLayout:'main'});
const mysql = require('./dbcon.js');

// Renders pages
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.set('port', process.argv[2]);


function getAirports(res, mysql, context){
    var callbackCount = 0;
    mysql.pool.query("SELECT * FROM airports", function(error, results){
        if(error){
            console.log("Error in mySQL.", error);
        }
        context.airports = results;
        callbackCount++;
        if (callbackCount > 0) {
            res.render('sitePage2', context);
        }
    })
};

function getAirportsByState(res, mysql, selectedState, context){
    var callbackCount = 0;
    mysql.pool.query("SELECT name, ID FROM airports WHERE iso_region = " + selectedState,
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

function getAirportsBySearch(res, mysql, searchString, context){
    var callbackCount = 0;
    mysql.pool.query("SELECT name, ID FROM airports WHERE name LIKE " + searchString,
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
    res.render('sitePage2');
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
