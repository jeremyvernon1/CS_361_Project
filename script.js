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


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sitePage1', (req, res) => {
    res.render('sitePage1');
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
