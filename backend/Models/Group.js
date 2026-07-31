const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    isGroup:{
        type: Boolean,
        required: true
    },
    name: {
        type: String
    },
    participants:{
        type: Array,
    }
})

module.exports = mongoose.model('group', groupSchema)