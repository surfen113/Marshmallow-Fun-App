var mongoose = require('mongoose');

var Follow = new mongoose.Schema({
    follower: {
        type:String,
        required: true
    },
    followerUsername: {
        type:String,
        required: true
    },
    followed: {
        type:String,
        required: true
    },
    followedUsername: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Follow', Follow);
