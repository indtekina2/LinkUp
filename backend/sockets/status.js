// Create a new Set
const onlineUsers = new Set();

function online(socket) {
    onlineUsers.add(socket.user.id);
    console.log(onlineUsers)
}

function offline(socket){
    onlineUsers.delete(socket.user.id);
    console.log(onlineUsers)
}

module.exports = { online, offline, onlineUsers };