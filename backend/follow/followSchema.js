var mongoose = require('mongoose');

var Follow = new mongoose.Schea({
    follower: {
        type:User,
        required: true
    },
    followed: {
        type:User,
        required: true
    }
});

module.exports = mongoose.model('Follow', Follow);
