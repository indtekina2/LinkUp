const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    convoID: {
        type: String,
        unique: true,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('message', messageSchema)