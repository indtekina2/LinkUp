const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    convoID: {
        type: String,
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
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('message', messageSchema)