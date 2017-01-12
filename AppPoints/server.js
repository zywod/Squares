var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
require('./api/models/db');
var routesApi = require('./api/routes/index');

var app = express();

app.use(bodyParser.urlencoded({ limit: '5mb', extended: false  }));
app.use(bodyParser.json(({limit: '5mb' })));


 app.use(express.static(path.join(__dirname, 'client')));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/lib', express.static(__dirname + '/node_modules/angular'));
app.use('/lib', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/lib', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-modal-service/dst'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-file-saver/dist'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-resource'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-route'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-material'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-animate'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-aria'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-messages'));
app.use('/lib', express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist'));

//use APi routes
 app.use('/api', routesApi);


app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'Client', 'index.html'));
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});


module.exports = app;