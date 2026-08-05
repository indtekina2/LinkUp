const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const register = require("./controllers/Register");
const connectDB = require("./config/db");
const login = require("./controllers/Login");
const authenticateToken = require("./middleware/authMiddleware");
const createGroup = require("./controllers/new-group");
const { joinGroup, joinConversation } = require("./controllers/join-convo");
const { sendMessage, saveMessage } = require("./controllers/sendMessage");
const getCoversations = require("./controllers/getConversations");

const { currentUser, getAllUser } = require("./controllers/userInfo");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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

// verifying the user in socket
io.use((socket, next) => {
  console.log("Auth received:", socket.handshake.auth);
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("No token provided"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = user;

    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
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

io.on("connection", (socket) => {
  console.log(`${socket.user.id} connected`);

  socket.on("join-conversation", async (convoID) => {
  const conversation = await Conversation.findById(convoID);
  if (conversation && conversation.participants.includes(socket.user.id)) {
    socket.join(convoID);
  }
});

  socket.on("send-message", async (data) => {
    console.log(data)
    try {
      const savedMessage = await saveMessage({
        convoID: data.convoID,
        message: data.message,
        sender: socket.user.id,
      });

      io.to(data.convoID).emit("new-message", savedMessage);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  });
});

server.listen(port);
