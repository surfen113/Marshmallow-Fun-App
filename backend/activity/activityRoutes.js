module.exports = activityRoutes;


function activityRoutes(passport) {

    var activityController = require('./activityController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(activityController.postActivity)
        .get(activityController.getActivity);

    router.route('/:activity_id')
        .get(activityController.getActivity)
        .put(activityController.putActivity)
        .delete(activityController.deleteActivity);

    return router;
}
