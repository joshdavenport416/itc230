var cheeses = require("./models/cheeses");

cheeses.countDocuments((err, result) => {
    console.log(result);
});

cheeses.find({}, (err, items) => {
    if (err) return next(err);
    console.log(items.length);
});