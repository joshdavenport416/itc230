const credentials = require('./credentials');
const mongoose = require('mongoose');

mongoose.connect(credentials.connectionString, {
    dbName: "test_db", useNewUrlParser: true });
    
mongoose.connection.on('open', () => {
            console.log('Mongoose connected.');
        });
        
// define Cheese model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
        _id: {type: Number, required: true },
        cheeseName: String,
        cheeseOzPackSize: Number,
        cheeseBrand: String,
        cheesePricePerOz  : Number
       }); 
       
module.exports = mongoose.model('Cheese', mySchema);