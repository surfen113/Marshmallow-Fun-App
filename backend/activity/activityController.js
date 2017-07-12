var Config = require('../config/config.js');
var User = require('./activitySchema');
var jwt = require('jwt-simple');



module.exports.postActivity = function(req, res){


    var activity = new Activity();
    activity.title = req.body.title;
    /*
    var user = new User();

    user.username = req.body.username;
    user.password = req.body.password;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.birthday = req.body.birthday;
    user.address = req.body.address;
    user.mobile = req.body.mobile;
    user.aboutme = req.body.aboutme;
    user.sports = req.body.sports;
    user.social = req.body.social;
    user.music = req.body.music;
    user.culture = req.body.culture;
    user.party = req.body.party;
    //user.image = req.body.image;

    */

    activity.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json(m);
    });

};


// Create endpoint /api/movies for GET
exports.getActivities = function(req, res) {
    Activity.find(function(err, activies) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(activies);
    });
};

/*
var Activity = require('./activitySchema');
exports.postActivity = function(req, res) {

    //var activity = new Activity(req.body);

    //if (!req.user.equals(activity.user)) {
    //    res.sendStatus(401);
    //}


    var activity = new Activity();
    activity.title = req.body.title;

    activity.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};


exports.getActivity = function(req, res) {
    Activity.find(function(err, activities) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(activities);
    });
};


exports.getActivity = function(req, res) {
    Activity.findById(req.params.activity_id, function(err, activity) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(activity);
    });
};


exports.putActivity = function(req, res) {

    Activity.findByIdAndUpdate(
        req.params.activity_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, activity) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.json(activity);
        });
};


exports.deleteActivity = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Activity.findById(req.params.activity_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};

*/