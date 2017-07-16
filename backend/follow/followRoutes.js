module.exports = followRoutes;


function followRoutes(passport) {

    var followController = require('./followController');
    var router = require('express').Router();
    // var unless = require('express-unless');

    // var mw = passport.authenticate('jwt', {session: false});
    // mw.unless = unless;

    //middleware
    // router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.post('/followAdd', followController.postFollow);
    router.get('/followGetAll', followController.getFollows);
    router.delete('/delete/:follow_id', followController.deleteFollow);
    //router.route('/')
    //    .post(followController.postFollow)
    //    .get(followController.getFollows);

    //router.route('/:follow_id').delete(followController.deleteFollow);

    return router;
}
