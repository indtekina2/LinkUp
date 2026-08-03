const Message = require("../Models/Message");
const Conversations = require("../Models/Conversation");

async function getConversations(req, res) {
  const { convoID } = req.body;

  // check if the convoID exists
  if (!convoID) {
    return res.status(400).json({
      success: false,
      message: "No id was sent",
    });
  }

  try {
    const conversation = await Conversations.findById(convoID);

    // Check if conversation exists
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    if (conversation.participants.includes(req.user.id)) {
      const messages = await Message.find({ convoID: convoID });

      return res.status(200).json({
        success: true,
        data: {
            id: conversation._id,
            isGroup: conversation.isGroup,
            name: conversation.name,
            messages: messages
        }
      });
    }

    return res.status(403).json({
      success: false,
      message: "You don't have permission to view this conversation",
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

module.exports = getConversations;
