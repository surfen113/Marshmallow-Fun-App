var Follow = require('./followSchema');

exports.postFollow = function(req, res) {
    var follow = new Follow(req.body);
    follow.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};


exports.getFollows = function(req, res) {

    Follow.find(function(err, follows) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(follows);
    });
};


/*
// Create endpoint /api/movies/:movie_id for GET
exports.getMovie = function(req, res) {
    // Use the Movie model to find a specific movie
    Movie.findById(req.params.movie_id, function(err, movie) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(movie);
    });
};

// Create endpoint /api/movies/:movie_id for GET
exports.getMovie = function(req, res) {
    // Use the Movie model to find a specific movie
    Movie.findById(req.params.movie_id, function(err, movie) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(movie);
    });
};

// Create endpoint /api/movies/:movie_id for PUT
exports.putMovie = function(req, res) {
    // Use the Movie model to find a specific movie and update it
    Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, movie) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.json(movie);
        });
};

*/
// Create endpoint /api/movies/:movie_id for DELETE
exports.deleteFollow = function(req, res) {
    Follow.findById(req.params.follow_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};