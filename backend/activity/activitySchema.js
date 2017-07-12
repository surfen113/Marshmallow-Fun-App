var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var activitySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

activitySchema.pre('save', function(next) {
    var activity = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
    });
});


var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

