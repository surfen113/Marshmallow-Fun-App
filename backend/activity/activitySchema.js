var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var activitySchema = mongoose.Schema({
    latitude: {
        type:Number,
        //required: true
        //value: 47.263
    },
    longitude: {
        type:Number,
        //value: 10.669
        //required: true
    },
    title: String,

    sports: Boolean,
    social: Boolean,
    music: Boolean,
    culture: Boolean,
    party:Boolean,
    date:String,
    details: String,

    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }



});




var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

