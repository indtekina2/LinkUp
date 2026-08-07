const Conversation = require("../Models/Conversation");

const onlineUsers = new Map();

function online(socket, io) {
  const userId = socket.user.id;

  const count = onlineUsers.get(userId) || 0;
  onlineUsers.set(userId, count + 1);

  if (count === 0) {
    broadcastStatus(userId, true, io);
  }

  socket.join(userId);
}

async function offline(socket, io) {
  const userId = socket.user.id;

  const count = onlineUsers.get(userId) || 0;

  if (count <= 1) {
    onlineUsers.delete(userId);
    await broadcastStatus(userId, false, io);
  } else {
    onlineUsers.set(userId, count - 1);
  }
}

async function broadcastStatus(userId, isOnline, io) {
  // Find everyone who shares a private conversation with this user
  const conversations = await Conversation.find({
    participants: userId,
    isGroup: false,
  });

  const contactIds = conversations
    .map((c) => c.participants.find((p) => p !== userId))
    .filter(Boolean);

  contactIds.forEach((id) => {
    io.to(id).emit("status_info", { userId, isOnline });
  });
}

module.exports = { online, offline, onlineUsers };
