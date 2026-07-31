const User = require("../Models/User");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Fill the form",
    });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Use correct password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "You are logged in",
      result: {
        id: user._id,
        username: user.username,
        conversations: user.conversations,
        currentUser: true,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Getting some sleep is better than debuggin atp",
    });
  }
}

module.exports = login;