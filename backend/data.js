const mongoose = require("mongoose");
const User = require("./Models/User");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/LinkUp");
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection failed");
  }
}

connectDB();

// saving in new logged in users
async function saveUser(username, password) {
  let returnStatement = {
    success: false,
    message: "Nothing happened",
  };
  try {
    const user = new User({
      username: username,
      password: password,
      conversations: [],
    });

    await user.save();
    returnStatement.message = "User saved successfully";
    returnStatement.success = true;

    return returnStatement;
  } catch (err) {
    returnStatement.success = false;
    if (err.code === 11000) {
      returnStatement.message = "This user already exists";
    } else {
      console.error(err);
      returnStatement.message = "Idk, something went wrong";
    }
    return returnStatement
  }
}

module.exports = {
  saveUser,
};
