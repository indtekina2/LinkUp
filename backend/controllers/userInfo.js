const User = require("../Models/User");
const Conversation = require("../Models/Conversation");

async function currentUser(req, res) {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const conversations = await Conversation.find({ participants: userId }).select("participants");

    const participantIds = conversations.flatMap((conversation) => conversation.participants);
    const uniqueParticipants = [...new Set(participantIds.map((participantId) => participantId.toString()))];

    // Return the user information without the password
    res.json({
      success: true,
      user: {
        username: user.username,
        currentUser: true,
        id: user._id,
        conversations: user.conversations,
        participants: uniqueParticipants
      },
    });
  } catch (err) {
    console.error("Error fetching current user:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function getAllUser(req, res) {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No ids were given.",
    });
  }

  try {
    const users = await User.find({
      _id: { $in: ids },
    }).select("_id username").lean();

    return res.json({
      success: true,
      users: users.map((user) => ({
        id: user._id,
        username: user.username,
      })),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}


module.exports = { currentUser, getAllUser };
