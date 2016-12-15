var mongoose = require('mongoose');
var ListOfPoints = mongoose.model('listOfPoints');

module.exports.createList = function (req, res) {
    ListOfPoints.findOne({ name: req.body.name }, function (err, found) {
        if (!found) {
            var list = new ListOfPoints();
            list.name = req.body.name;
            list.xy.push(...req.body.xy);
            list.save(function (err) {
                if (!err)
                    res.status(201);
                res.json({ message: 'List created successfuly' });
            });
        } else Overwrite(req, res);
    });

}

module.exports.getAllLists = function (req, res) {
    ListOfPoints.find(function (err, list) {
        if (err) {
            res.send(err);
            res.status(404);
        }
        res.status(200);

        res.json(list);
    });
};


function Overwrite(req, res) {
    ListOfPoints.findOneAndUpdate({ name: req.body.name }, { $set: { name: req.body.name, xy: req.body.xy } }, { new: true },
        function (err, list) {
            if (err) {
                res.send(err);
                res.status(404);
            }
            res.status(201);
            res.json({ message: 'List overwritten successfuly' });
        });
}



module.exports.updateXy = function (req, res) {
    ListOfPoints.findOne({ name: req.params.name }, function (err, list) {
        if (err)
            res.send(err);

        list.xy = req.body.xy;
        list.name = req.params.name;
        list.save(function (err) {
            if (err)
                res.send(err);
            res.status(200);
            res.json({ message: 'Overwrited successfuly' });
        });
    });
};

module.exports.getList = function (req, res) {

    ListOfPoints.findById(req.params.list_id, 'xy name', function (err, list) {
        if (err) {
            res.send(err);
            res.status(404);
        }
        res.json(list);
        res.status(200);
    });

};



module.exports.deleteList = function (req, res) {
    ListOfPoints.remove({
        _id: req.params.list_id
    },
        function (err) {
            if (err) {
                res.send(err);
                res.status(404);
            }

            res.json({ message: 'Successfully deleted' });
            res.status(200);
        });
};


module.exports.deleteWholeList = function (req, res) {
    ListOfPoints.remove({},
        function (err, point) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
};

