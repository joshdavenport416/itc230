'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const cheeses = require("./lib/data");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({ extended: true })); // parse form submissions

const handlebars = require("express-handlebars");
app.engine(".html", handlebars({ extname: '.html', defaultLayout: false }));
app.set("view engine", ".html");

// send static file as response
// app.get('/', (req, res) => {
//     res.type('text/html'); 
//     res.sendFile(__dirname + '/public/home.html');
// });

app.get('/', (req, res) => {
    res.render('home', {name: req.query.name});
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.sendFile(__dirname + '/public/about.html');
});

// handle form submission
app.post('/detail', (req, res) => {
    let result = cheeses.getItem(req.body.cheese);
    res.render('detail', {cheeseName: req.body.cheese, result: result})
});

app.get('/delete', (req,res) => {
    let result = cheeses.deleteItem(req.query.cheese);
    res.render('delete', {deletedItem: req.query.cheese, result: result})
});

// define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started at ' + __dirname);
});




