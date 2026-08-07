const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const checkToken = require("../utils/checkToken");

async function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied",
    });
  }

  const token = authHeader.split(" ")[1];

  const response = await checkToken(token);
  if(!response.success){
    return res.status(response.code).json({
      success: response.success,
      message: response.message
    })
  }
  req.user = response.user;
  next()
}

module.exports = authenticateToken;
