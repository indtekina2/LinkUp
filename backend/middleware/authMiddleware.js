const jwt = require("jsonwebtoken");
const User = require("../Models/User");

async function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // check if the user even exists
    const existingUser = await User.findById(user.id);

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

module.exports = authenticateToken;
