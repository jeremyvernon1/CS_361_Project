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

function getAirports(res, mysql, airports){
    var testArr0 = { "foo":
        ["Hello", " ", "World", "!"]
    };
    var testArr1 = {"name":["John"], "age":30, "car":null}
    /* mysql.pool.query("SELECT * FROM airports", function(error, results){
        if(error){
            console.log("Error in mySQL.", error);
        }
        airports = results;
        console.log("Airport1: ", airports[0].name);
    }); */
    // console.log("Test1: ", testArr[0]);
    res.render('sitePage2', testArr1);
}


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sitePage1', (req, res) => {
    res.render('sitePage1');
});

app.get('/sitePage2', (req, res) => {
    var airports = {};
    var mysql = req.app.get('mysql');
    getAirports(res, mysql, airports);
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
