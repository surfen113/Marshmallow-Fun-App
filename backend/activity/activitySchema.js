var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var activitySchema = mongoose.Schema({
    latitude: {
        type:String,
        required: true
    },
    longitude: {
        type:String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }



});

activitySchema.pre('save', function(next) {
    var activity = this;

    /*
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
    });
    */
});


var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

