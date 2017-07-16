/**
 * Created by Thomas Stohl on 14.07.2017.
 */

"use strict"
const Conversation = require('./conversationSchema'),
    Message = require('./messageSchema'),
    User = require('../user/userSchema');

exports.getConversations = function(req, res, next) {
    console.log("getConversations");
    console.log("user_id " + req.params.user_id);
    console.log("_id");
    // console.log(req);
    // Only return one message from each conversation to display as snippet
    Conversation.find({ participants: req.params.user_id })
        .select('user_id')
        .exec(function(err, conversations) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            // Set up empty array to hold conversations + most recent message
            let fullConversations = [];
            conversations.forEach(function(conversation) {
                Message.find({ 'conversationId': conversation._id })
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: "author",
                        select: "profile.firstName profile.lastName"
                    })
                    .exec(function(err, message) {
                        if (err) {
                            res.send({ error: err });
                            return next(err);
                        }
                        fullConversations.push(message);
                        if(fullConversations.length === conversations.length) {
                            return res.status(200).json({ conversations: fullConversations });
                        }
                    });
            });
        });
};

exports.getConversation = function(req, res, next) {
    console.log("getConversation");
    Message.find({ conversationId: req.params.conversationId })
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'profile.firstName profile.lastName'
        })
        .exec(function(err, messages) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            res.status(200).json({ conversation: messages });
        });
};

exports.newConversation = function(req, res, next) {
    console.log("newConversation");
    console.log("User: " +req.user._id)
    console.log(req.params);
    console.log(req.params.user_id);
    console.log(req.body);

    var recipient = req.body;

    if(!req.params.recipient) {
        res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
        return next();
    }

    if(!req.body.composedMessage) {
        res.status(422).send({ error: 'Please enter a message.' });
        return next();
    }

    const conversation = new Conversation({
        participants: [req.params.user_id, req.params.recipient]
    });

    conversation.save(function(err, newConversation) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        const message = new Message({
            conversationId: newConversation._id,
            body: req.body.composedMessage,
            author: req.user._id
        });

        message.save(function(err, newMessage) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
            return next();
        });
    });
};

exports.sendReply = function(req, res, next) {
    console.log("sendReply");
    console.log("User: " + req.user._id)
    const reply = new Message({
        conversationId: req.params.conversationId,
        body: req.body.composedMessage,
        author: req.user._id
    });

    reply.save(function(err, sentReply) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        // return status 200 and message
        res.status(200).json(sentReply);
        return(next);
    });
};

// DELETE Route to Delete Conversation
exports.deleteConversation = function(req, res, next) {
    Conversation.findOneAndRemove({
        $and : [
            { '_id': req.params.conversationId }, { 'participants': req.user._id }
        ]}, function(err) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        res.status(200).json({ message: 'Conversation removed!' });
        return next();
    });
}

// PUT Route to Update Message
exports.updateMessage = function(req, res, next) {
    Conversation.find({
        $and : [
            { '_id': req.params.messageId }, { 'author': req.user._id }
        ]}, function(err, message) {
        if (err) {
            res.send({ error: err});
            return next(err);
        }

        message.body = req.body.composedMessage;

        message.save(function (err, updatedMessage) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            res.status(200).json({ message: 'Message updated!' });
            return next();
        });
    });
};