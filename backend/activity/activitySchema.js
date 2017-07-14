var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var activitySchema = mongoose.Schema({
    latitude: {
        type:String,
        //required: true
    },
    longitude: {
        type:String,
        //required: true
    },
    title: String,

    sports: Boolean,
    social: Boolean,
    music: Boolean,
    culture: Boolean,
    party:Boolean,
    date:String,
    details:String,

    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }



});




var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

