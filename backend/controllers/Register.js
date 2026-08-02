const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// saving in new logged in users
async function register(req, res) {
  // The received info
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }
  try {
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // creating and saving the new user
    const user = new User({
      username: name,
      password: hashedPassword,
      conversations: [],
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: token
    });
  } catch (err) {
    returnStatement.success = false;
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This user already exists",
      });
    } else {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Idk, something went wrong",
      });
    }
  }
}

module.exports = register;
