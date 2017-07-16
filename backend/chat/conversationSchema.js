/**
 * Created by Thomas Stohl on 14.07.2017.
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Conversation', ConversationSchema);