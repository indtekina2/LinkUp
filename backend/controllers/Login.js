const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { username, password } = req.body;

  // no username or password was provided
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Fill the form",
    });
  }

  try {
    // check if the user exists in the database
    const user = await User.findOne({ username });

    // if the user does not exist, return a 404 error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username not found",
      });
    }

    // compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Use correct password",
      });
    }

    // generate a JWT token for the user
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    return res.status(200).json({
      success: true,
      message: "You are logged in",
      token: token,
    });
  } catch (err) {
    // catching any random errors
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Getting some sleep is better than debuggin atp",
    });
  }
}

module.exports = login;
