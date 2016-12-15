var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var operations = require('../controllers/operations');


router.use(function (req, res, next) {
    next();
});


//Routes
router.put('/list/:list_id', operations.updateXy);
router.delete('/list/:list_id', operations.deleteList);
router.post('/list', operations.createList);
router.delete('/list/', operations.deleteWholeList);
router.get('/list', operations.getAllLists);
router.get('/list/:list_id', operations.getList);


module.exports = router;