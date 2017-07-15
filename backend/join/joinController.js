var Join = require('./joinSchema');

exports.postJoin = function(req, res) {
    var join = new Join(req.body);
    join.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};


exports.getJoin = function(req, res) {

    Join.find(function(err, join) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(join);
    });
};
exports.deleteJoin = function(req, res) {
    console.log("delete backend");
    Join.findById(req.params.join_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};