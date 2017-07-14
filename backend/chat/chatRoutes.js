module.exports = chatRoutes;


function chatRoutes(passport) {

    var chatController = require('./chatController');
    var router = require('express').Router();

    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    // middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));


    // get conversations for a user
    router.route('/:user_id')
        .get(chatController.getConversations);

    router.route('/conversation/:conversationId')
        // get single conversation
        .get(chatController.getConversation)
        // send reply to a conversation
        .post(chatController.sendReply);

    router.route('/new/:user_id/:recipient').post(chatController.newConversation);

    return router;
}
