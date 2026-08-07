const Conversation = require("../Models/Conversation");

const onlineUsers = new Set();

async function online(socket, io) {
  onlineUsers.add(socket.user.id);
  socket.join(socket.user.id); // personal room, keyed by user ID
  await broadcastStatus(socket.user.id, true, io);
}

async function offline(socket, io) {
  onlineUsers.delete(socket.user.id);
  await broadcastStatus(socket.user.id, false, io);
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