var mongoose = require('mongoose');
var config = require('../config/config');

if (process.env.node_env === 'production') {
    dbURI = process.env.MANGOLAB_URI;
}

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri);


// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + config.dbUri);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// SCHEMAS 
require('./listOfPoints');