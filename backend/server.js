const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = require("./controllers/Register");
const connectDB = require("./config/db");
const login = require("./controllers/Login");
const authenticateToken = require("./middleware/authMiddleware");
const createGroup = require("./controllers/new-group");
const { joinGroup, joinConversation } = require("./controllers/join-convo");
const { sendMessage, saveMessage } = require("./controllers/sendMessage");
const getCoversations = require("./controllers/getConversations");
const { currentUser, getAllUser } = require("./controllers/userInfo");
const initializeSocket = require("./sockets/index")

const User = require("./Models/User");
const Conversation = require("./Models/Conversation");

const app = express();
const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware to parse JSON bodies
app.use(express.json());

// connecting with mongoDB
connectDB();

// black box for me...
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("information");
});

app.post("/api/signup", register);

app.post("/api/login", login);

app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({
    message: "This is from a protected route",
    userId: req.user.id,
    success: true,
  });
});

app.post("/api/create-group", authenticateToken, createGroup);

app.post("/api/join-group", authenticateToken, joinGroup);

app.post("/api/join-conversation", authenticateToken, joinConversation);

// app.post("/api/messages/send", authenticateToken, sendMessage);

app.get("/api/current-user", authenticateToken, currentUser);

app.post("/api/users", authenticateToken, getAllUser);

app.post("/api/conversations", authenticateToken, getCoversations);

initializeSocket(io)

server.listen(port);
