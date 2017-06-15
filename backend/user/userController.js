var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');

module.exports.login = function(req, res){

    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({username: req.body.username}, function(err, user){
        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch || err){
                res.status(401).send('Invalid Credentials');
            } else {
                res.status(200).json({token: createToken(user)});
            }
        });
    });

};

module.exports.signup = function(req, res){
    if(!req.body.username){
        res.status(400).send('username required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

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

    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(user)});
    });
};

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};

// Create endpoint /api/user/:user_id for GET
exports.getProfile = function(req, res) {

    User.findById(req.params.user_id, function(err, user) {
        if (err) {
            res.status(400).send(err)
            return;
        };
        res.json(user);
    });
};

/* Update profile */
exports.updateProfile = function(req,  res) {

    // Use the User model to find a specific user and update it
    User.findByIdAndUpdate(
        req.params.user_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, user) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.json(user);
        });

};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            username: user.username
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};