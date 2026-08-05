const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");

// getting message from the client and saving it to the database
async function sendMessage(req, res) {
  const { convoID, message, timestamp } = req.body;
  try {
    // Check if the conversation exists
    const conversation = await Conversation.findById(convoID);
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }
    // if the user exists in the convo
    else if (conversation.participants.includes(req.user.id)) {
      // Create a new message
      const newMessage = new Message({
        convoID,
        sender: req.user.id,
        message: message,
        timestamp: timestamp || new Date(),
      });
      await newMessage.save();
      return res
        .status(201)
        .json({ success: true, message: "Message sent successfully" });
    } else {
      return res.status(403).json({
        success: false,
        message: "The user is not registered in the group"
      })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}

module.exports = { sendMessage };
