var cheeses = require("./models/cheese");

Cheeses.countDocuments((err, result) => {
    console.log(result);
});

Cheese.find({}, (err, items) => {
    if (err) return next(err);
    console.log(items.length);
});