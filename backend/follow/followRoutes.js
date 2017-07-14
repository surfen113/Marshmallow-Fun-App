module.exports = followRoutes;


function followRoutes(passport) {

    var followController = require('./followController');
    var router = require('express').Router();
    // var unless = require('express-unless');

    // var mw = passport.authenticate('jwt', {session: false});
    // mw.unless = unless;

    //middleware
    // router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(movieController.postFollow)
        .get(movieController.getFollows);

    router.route('/:follow_id').delete(folowController.deleteFollow);

    return router;
}
