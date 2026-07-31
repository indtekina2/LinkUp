const User = require("../Models/User");
const bcrypt = require("bcrypt");

// saving in new logged in users
async function register(req, res) {
  // The received info
  const { name, password } = req.body;
//   console.log("Received:", name, password);

  // will be send back to the frontend
  let returnStatement = {
    success: false,
    message: "Nothing happened",
    result: null,
  };

  if (!name || !password) {
    returnStatement.success = false;
    returnStatement.message = "Username and password are required.";
    return res.status(400).json(returnStatement);
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

    returnStatement.message = "User saved successfully";
    returnStatement.success = true;
    returnStatement.result = {
      id: user._id,
    };

    res.status(201).json(returnStatement);
  } catch (err) {
    returnStatement.success = false;
    if (err.code === 11000) {
      returnStatement.message = "This user already exists";
      res.status(409).json(returnStatement);
    } else {
      console.error(err);
      returnStatement.message = "Idk, something went wrong";
      res.status(500).json(returnStatement);
    }
  }
}

module.exports = register;
