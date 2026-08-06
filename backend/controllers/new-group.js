const Conversation = require("../Models/Conversation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// create new group
async function createGroup(req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({
      success: false,
      message: "Group name and password are required.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 13);

    // check if group with the same name already exists
    const existingGroup = await Conversation.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({
        success: false,
        message: "Group with this name already exists.",
      });
    }

    const group = new Conversation({
      isGroup: true,
      name: name,
      password: hashedPassword,
      participants: [req.user.id],
    });
    await group.save();

    const user = await User.findById(req.user.id);
    user.conversations.push(group._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Group created successfully.",
    });
  } catch (error) {
    // console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error occurred while creating the group.",
    });
  }
}

module.exports = createGroup;
