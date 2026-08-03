const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    isGroup:{
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    participants:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Conversation', conversationSchema)