var mongoose = require('mongoose');

var Join = new mongoose.Schema({
    userID: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    activityID: {
        type:String,
        required: true
    },
    activityTitle: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Join', Join);