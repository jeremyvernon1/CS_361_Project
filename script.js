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
}

function getAirportsByState(res, mysql, context){
    var callbackCount = 0;
    mysql.pool.query("SELECT * FROM airports WHERE iso_region = 'US-AL'", function(error, results){
        if(error){
            console.log("Error in mySQL.", error);
        }
        context.airports1 = results;
        callbackCount++;
        if (callbackCount > 0) {
            res.render('sitePage1', context);
        }
    })
}

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sitePage1', (req, res) => {
    var context = {};
    var mysql = req.app.get('mysql');
    //getAirports(res, mysql, context);
    getAirportsByState(res, mysql, context);
});

app.get('/sitePage2', (req, res) => {
    res.render('sitePage2');
});

app.get('/sitePage3', (req, res) => {
    res.render('sitePage3');
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
