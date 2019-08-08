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
app.use('/api', require('cors')());

// send static file as response
// app.get('/', (req, res) => {
//     res.type('text/html'); 
//     res.sendFile(__dirname + '/public/home.html');
// });

// get all
app.get('/', (req, res, next) => {
    cheeses.find((err, cheeses) => {
        if (err) return next(err);
        res.render('home2', { cheeses: JSON.stringify(cheeses)});
        // res.render('home', { cheeses: JSON.stringify(items)});
    });
});

// send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.sendFile(__dirname + '/public/about.html');
});

// handle form submission
app.post('/detail', (req, res, next) => {
    cheeses.findOne({ 'cheeseName': req.body.cheeseName }, { '_id': false }, (err, item) => {
        if (err) return next(err);
        res.render('detail', { cheese: item });
    })
});

app.get('/detail', (req, res, next) => {
    cheeses.findOne({'cheeseName':req.query.cheeseName}, {'_id':false}, (err, item) => {
        if (err) return next(err);
        res.render('detail', { cheese: item });
    })
});


// delete item
app.get('/delete', (req, res) => {
    cheeses.deleteOne({ 'cheeseName': req.query.cheeseName }, (err, next) => {
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
        'cheesePricePerOz': req.body.cheesePricePerOz};
    cheeses.update({ 'cheeseName': req.body.cheeseName }, newCheese, { upsert: true }, (err, result) => {
        if (err) return next(err);
        console.log(result);
        res.render('add', {
            cheeseName: req.body.cheeseName,
            cheeseOzPackSize: req.body.cheeseOzPackSize,
            cheeseBrand: req.body.cheeseBrand,
            cheesePricePerOz: req.body.cheesePricePerOz
        })
    })
});


// api
// get a single item
app.get('/api/detail/:cheeseName', (req, res, next) => {
    cheeses.findOne({ cheeseName: req.params.cheeseName }, { "_id": false }, (err, item) => {
        if (err) return next(err);
        res.json(item);
    })
});

// get all items
app.get('/api/detail', (req, res, next) => {
    cheeses.find({}, { "_id": false }, (err, items) => {
        if (err) return next(err);
        res.json(items);
    })
});

// delete an item
app.get('/api/delete/:cheeseName', (req, res, next) => {
    cheeses.deleteOne({ cheeseName: req.params.cheeseName }, (err, item) => {
        if (err) return next(err);
        res.json(item);
    })
});






// add an item
app.post('/api/added/', (req, res, next) => {
    cheeses.updateOne({
        'cheeseName': req.body.cheeseName,
        'cheeseOzPackSize': req.body.cheeseOzPackSize,
        'cheeseBrand': req.body.cheeseBrand,
        'cheesePricePerOz': req.body.cheesePricePerOz }, req.body, { upsert: true }, (err, result) => {
            res.json({
                cheeseName: req.body.cheeseName,
                cheeseOzPackSize: req.body.cheeseOzPackSize,
                cheeseBrand: req.body.cheeseBrand,
                cheesePricePerOz: req.body.cheesePricePerOz });
    })
});


// add item
app.post('/add', (req, res) => {
    let newCheese = {
        'cheeseName': req.body.cheeseName,
        'cheeseOzPackSize': req.body.cheeseOzPackSize,
        'cheeseBrand': req.body.cheeseBrand,
        'cheesePricePerOz': req.body.cheesePricePerOz
    };
    cheeses.update({ 'cheeseName': req.body.cheeseName }, newCheese, { upsert: true }, (err, result) => {
        if (err) return next(err);
        console.log(result);
        res.render('add', {
            cheeseName: req.body.cheeseName,
            cheeseOzPackSize: req.body.cheeseOzPackSize,
            cheeseBrand: req.body.cheeseBrand,
            cheesePricePerOz: req.body.cheesePricePerOz
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
// var newCheese = { cheeseName: 'Port Salut', cheeseOzPackSize: 16, cheeseBrand: 'Port Salut', cheesePricePerOz: 1.34 }
// Book.update({ 'cheeseName': 'Port Salut' }, newCheese, { upsert: true }, (err, result) => {
//     if (err) return next(err);
//     console.log(result);
// }); 
