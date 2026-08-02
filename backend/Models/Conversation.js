const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    isGroup:{
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    participants:{
        type: Array,
    }
})

module.exports = mongoose.model('Conversation', conversationSchema)