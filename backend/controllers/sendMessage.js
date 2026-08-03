const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");


// getting message from the client and saving it to the database
async function sendMessage(req, res) {
  const { message } = req.body;
  try {
    // Check if the conversation exists
    const conversation = await Conversation.findById(message.convoID);
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }
    // Create a new message
    const newMessage = new Message({
      convoID: message.convoID,
      sender: req.user.id,
      content: message.message,
      timestamp: message.timestamp || new Date().toISOString(),
    });
    await newMessage.save();
    return res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error });
  }
}

module.exports = { sendMessage };
