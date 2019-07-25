'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const cheeses = require('./models/cheese');
// const cheeses = require("./lib/data");

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
    cheeses.find({}, { '_id': false }, (err, items) => {
        if (err) return next(err);
        res.render('home', { cheeses: items });
    });
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.sendFile(__dirname + '/public/about.html');
});

// handle form submission
app.post('/detail', (req, res) => {
    cheeses.findOne({ 'cheeseName': req.body.cheeseName }, { '_id': false }, (err, item) => {
        if (err) return next(err);
        res.render('detail', { cheese: item });
    })
});

app.get('/detail', (req, res) => {
    cheeses.findOne({'cheeseName':req.query.cheeseName}, {'_id':false}, (err, item) => {
        if (err) return next(err);
        res.render('detail', { cheese: item });
    })
});


// delete item
app.get('/delete', (req, res) => {
    cheeses.deleteOne({ 'cheeseName': req.query.cheeseName }, (err, item) => {
        if (err) return next(err);
        cheeses.countDocuments((err, result) => {
            res.render('delete', {
                cheeseName: req.query.cheeseName,
                count: result
            });
        })
    })
});

// add item
app.post('/add', (req, res) => {
    let newCheese = {
        'cheeseName': req.body.cheeseName, 
        'cheeseOzPackSize': req.body.cheeseOzPackSize, 
        'cheeseBrand': req.body.cheeseBrand, 
        'cheesePricePerOZ': req.body.cheesePricePerOZ};
    cheeses.update({ 'cheeseName': req.body.cheeseName }, newCheese, { upsert: true }, (err, result) => {
        if (err) return next(err);
        console.log(result);
        res.render('add', {
            cheeseName: req.body.cheeseName,
            cheeseOzPackSize: req.body.cheeseOzPackSize,
            cheeseBrand: req.body.cheeseBrand,
            cheesePricePerOZ: req.body.cheesePricePerOZ
        })
    })
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






// // insert or update a single record
// var newCheese = { cheeseName: 'Port Salut', cheeseOzPackSize: 16, cheeseBrand: 'Port Salut', cheesePricePerOZ: 1.34 }
// Book.update({ 'cheeseName': 'Port Salut' }, newCheese, { upsert: true }, (err, result) => {
//     if (err) return next(err);
//     console.log(result);
// }); 
