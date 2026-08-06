const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");

// getting message from the client and saving it to the database
async function saveMessage( { convoID, message, sender } ) {
  
  try {
    // Check if the conversation exists
    const conversation = await Conversation.findById(convoID);
    if (!conversation) {
      return { success: false, message: "Conversation not found" };
    }
    // if the user exists in the convo
    else if (conversation.participants.includes(sender)) {
      // Create a new message
      const newMessage = new Message({
        convoID,
        sender: sender,
        message: message,
        timestamp: new Date(),
      });
      await newMessage.save();
      return newMessage;
    } else {
      return {
        success: false,
        message: "The user is not registered in the group"
      }
    }
  } catch (error) {
    return { success: false, message: error };
  }
}

async function sendMessage(req, res) {
    try {
        const saved = await saveMessage({
            convoID: req.body.convoID,
            sender: req.user.id,
            message: req.body.message,
        });

        res.status(201).json(saved);
    } catch (err) {
        return res.status(500).json({
          success:false,
          message: "Internal server error"
        })
    }
}

module.exports = { sendMessage, saveMessage };
