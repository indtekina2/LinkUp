const express = require("express");
const register = require("./controllers/Register");
const connectDB = require("./config/db");
const login = require("./controllers/Login");
const aunthenticateToken = require("./middleware/authMiddleware");
const createGroup = require("./controllers/new-group");
const {joinGroup, joinConversation} = require("./controllers/join-convo");
const { sendMessage } = require("./controllers/sendMessage");
const getCoversations = require("./controllers/getConversations")

const {currentUser, getAllUser} = require("./controllers/userInfo");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// connecting with mongoDB
connectDB();

// black box for me...
const cors = require("cors");
const authenticateToken = require("./middleware/authMiddleware");
app.use(cors());

app.get("/", (req, res) => {
  res.send("information");
});

app.post("/api/signup", register);

app.post("/api/login", login);

app.get("/api/protected", aunthenticateToken, (req, res) => {
  res.json({
    message: "This is from a protected route",
    userId: req.user.id,
    success: true,
  });
});

app.post("/api/create-group", aunthenticateToken, createGroup);

app.post("/api/join-group", aunthenticateToken, joinGroup);

app.post("/api/join-conversation", aunthenticateToken, joinConversation);

app.post("/api/messages/send", aunthenticateToken, sendMessage);

app.get("/api/current-user", aunthenticateToken, currentUser);

app.post("/api/users", authenticateToken, getAllUser)

app.post("/api/conversations", authenticateToken, getCoversations)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
