module.exports = movieRoutes;


function movieRoutes(passport) {

    var profileController = require('./profileController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(movieController.postProfile)
        // .get(movieController.getMovies);

    router.route('/:user_id')
        .get(profileController.getProfile)
        .put(profileController.putProfile)
        .delete(profileController.deleteProfile);

    return router;
}
