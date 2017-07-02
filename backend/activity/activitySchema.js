// Load required packages
var mongoose = require('mongoose');

// Define our activity schema
var Activity   = new mongoose.Schema({
    title: String
});

// Export the Mongoose model
module.exports = mongoose.model('Activity', Activity);

