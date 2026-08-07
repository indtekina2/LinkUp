const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 4,
  },

  conversations: [{
    type: String,
  }],

  state: {
    type: String
  }
});


module.exports = mongoose.model("user", userSchema)