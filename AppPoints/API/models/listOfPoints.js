var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    name: { type: String, unique: true},
    xy: Array 
});

mongoose.model('listOfPoints', listSchema);