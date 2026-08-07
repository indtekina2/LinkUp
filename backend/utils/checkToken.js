const jwt = require("jsonwebtoken");
const User = require("../Models/User");

async function checkToken(token) {
  // no token was given in the first place
  if (!token) {
    return {
      success: false,
      message: "Invalid Token",
      code: 401,
    };
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // check if the user even exists
    const existingUser = await User.findById(user.id);

    if(!existingUser){
      return {
        success: false,
        message: "Unauthorized",
        code: 401
      }
    }

    return {
      success: true,
      user: existingUser
    }
  } catch (error) {
    return {
      success: false,
      message: "Invalid or expired token",
      code: 403,
    };
  }
}

module.exports = checkToken