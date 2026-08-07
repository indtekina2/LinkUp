const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Conversation = require("../Models/Conversation");
const Message = require("../Models/Message");
const { saveMessage } = require("../controllers/sendMessage");
const checkToken = require("../utils/checkToken");
const { online, offline, onlineUsers } = require("./status");

function initializeSocket(io) {
  // Checking if the token is valid or not
  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;

    const response = await checkToken(token);
    if (!response.success) {
      return next(new Error(response.message));
    }

    socket.user = response.user;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`${socket.user.username} connected`);

    // Marking them as online
    online(socket, io);

    socket.on("isOnline", (id) => {
      socket.emit("status_info", { userId: id, isOnline: onlineUsers.has(id) });
    });

    socket.on("join-conversation", async (convoID) => {
      const conversation = await Conversation.findById(convoID);

      if (conversation && conversation.participants.includes(socket.user.id)) {
        socket.join(convoID);
      }
    });

    // Sending the information to everyone
    socket.on("send-message", async (data) => {
      try {
        // I don't know why I am adding this extra line of codes... SaveMessage already checks these conditions...
        const conversation = await Conversation.findById(data.convoID);
        if (
          !conversation ||
          !conversation.participants.includes(socket.user.id)
        ) {
          return;
        }
        const savedMessage = await saveMessage({
          convoID: data.convoID,
          message: data.message,
          sender: socket.user.id,
        });
        io.to(data.convoID).emit("new-message", savedMessage);
      } catch (err) {
        console.error(err);
      }
    });

    // Client sees the message...
    socket.on("message_seen", async (data) => {
      const message = await Message.findById(data.messageId);

      if (!message) {
        return;
      }

      const conversation = await Conversation.findById(message.convoID);

      if (
        !conversation ||
        !conversation.participants.includes(socket.user.id)
      ) {
        return;
      }

      message.receipt = "seen";
      await message.save();

      io.to(message.convoID.toString()).emit("get_message_seen", {
        messageId: message._id,
        receipt: message.receipt,
      });
    });

    socket.on("disconnect", () => {
      offline(socket, io);
    });
  });
}

module.exports = initializeSocket;
