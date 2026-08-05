const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  isGroup: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  participants: [
    {
      type: String,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Conversation", conversationSchema);
