module.exports = joinRoutes;


function joinRoutes(passport) {

    var joinController = require('./joinController');
    var router = require('express').Router();
    // var unless = require('express-unless');

    // var mw = passport.authenticate('jwt', {session: false});
    // mw.unless = unless;

    //middleware
    // router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.post('/joinAdd', joinController.postJoin);
    router.get('/joinGetAll', joinController.getJoin);
    router.delete('/delete/:join_id', joinController.deleteJoin);
    //router.route('/')
    //    .post(followController.postFollow)
    //    .get(followController.getFollows);

    //router.route('/:follow_id').delete(followController.deleteFollow);

    return router;
}
