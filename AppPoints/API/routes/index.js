var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var operations = require('../controllers/operations');

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


//Routes
router.put('/list/:list_id', operations.updateXy);
router.delete('/list/:list_id', operations.deleteList);
router.post('/list', operations.createList);
router.delete('/list/', operations.deleteWholeList);
router.get('/list', operations.getAllLists);
router.get('/list/:list_id', operations.getList);


module.exports = router;