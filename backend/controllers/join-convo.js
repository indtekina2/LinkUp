const Conversation = require("../Models/Conversation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// for joining a group conversation
async function joinGroup(req, res) {
    const { name, password } = req.body;

    // Check if the name and password are provided
    if (!name || !password) {
        return res.status(400).json({ message: "Name and password are required" });
    }

    // join the conversation if it exists and the password matches
    try {
        const conversation = await Conversation.findOne({ name });
        if (!conversation) {
            return res.status(404).json({ success: false, message: "Conversation not found" });
        }
        if (!conversation.isGroup) {
            return res.status(400).json({ success: false, message: "You can only join group conversations" });
        }
        const isMatch = await bcrypt.compare(password, conversation.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        // Add the user to the conversation's participants if not already present
        if (!conversation.participants.includes(req.user.id)) {
            conversation.participants.push(req.user.id);
            await conversation.save();
        }

        // Add the conversation to the user's conversations if not already present
        const user = await User.findById(req.user.id);
        if (!user.conversations.includes(conversation._id)) {
            user.conversations.push(conversation._id);
            await user.save();
        }
        res.status(200).json({ success: true, message: "Successfully joined conversation" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// for joining a private conversation
async function joinConversation(req, res) {
    const { name } = req.body;

    // Check if the name is provided
    if (!name) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    // Figuring out the 'name' of the private conversation based on the two participants
    try {
        const userId = req.user.id;

        // finding second participant's id based on the name provided
        const secondParticipant = await User.findOne({ name });
        if (!secondParticipant) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // creating the conversation name based on the two participants' ids
        const conversationName1 = [userId, secondParticipant._id].sort().join("-");
        const conversationName2 = [secondParticipant._id, userId].sort().join("-");

        // checking if the conversation already exists
        let conversation = await Conversation.findOne({ name: conversationName1 });
        if (!conversation) {
            conversation = await Conversation.findOne({ name: conversationName2 });
        }
        if (!conversation) {
            // Create a new conversation if it doesn't exist
            conversation = new Conversation({
                isGroup: false,
                name: conversationName1,
                participants: [userId, secondParticipant._id],
            });
            await conversation.save();

            // Add the conversation to both users' conversation lists
            const user = await User.findById(userId);
            user.conversations.push(conversation._id);
            await user.save();
            secondParticipant.conversations.push(conversation._id);
            await secondParticipant.save();
        }
        
        // Return the conversation details
        res.status(200).json({ success: true, message: "Successfully joined conversation", conversation });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {joinGroup, joinConversation};