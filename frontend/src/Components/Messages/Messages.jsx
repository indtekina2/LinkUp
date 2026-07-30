import React, { useState } from "react";
import "./Messages.css";
import { users, conversations } from "../../assets/data";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Messages({ id, visibilityClass }) {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  // Find the conversation
  let convo = conversations.find((conversation) => conversation.id === id);

  // Get the other participant(s) name
  const getChatName = () => {
    if (!convo) return "Chat";

    if (convo.isGroup) {
      return convo.name || "Group Chat";
    } else {
      // Find the other participant (not the current user)
      const otherParticipant = convo.participants.find((p) => p !== "user_001");
      const user = users.find((u) => u.id === otherParticipant);
      return user ? user.username : "Unknown User";
    }
  };

  // Get sender name from user ID
  const getSenderName = (senderId) => {
    const user = users.find((u) => u.id === senderId);
    return user ? user.username : senderId;
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === "" || !convo) return;

    const newMessage = {
      sender: users.find((user) => user.currentUser).id,
      message: inputText,
      timestamp: new Date().toISOString(),
    };

    console.log("New message:", newMessage);
    setInputText("");

    conversations
      .find((conversation) => conversation.id === id)
      .messages.push(newMessage);
    console.log(
      "Updated conversation:",
      conversations.find((conversation) => conversation.id === id).messages,
    );
  };

  if (!convo) {
    
      return (
        <div className={`MessageContainer no-conversation ${visibilityClass}`}>
          <div className="no-chat-selected">
            <p>Select a conversation to start chatting</p>
          </div>
        </div>
      );
  }

  return (
    <div className={`MessageContainer ${visibilityClass}`}>
      {/* Header */}
      <div className="chat-header">
        <div className="chat-info">
          <div className="chat-name">
            <button onClick={() => navigate("/home")} className="back-button">
              <ArrowLeft size={24} strokeWidth={2} />
            </button>
            <h3>{getChatName()}</h3>
          </div>
          <span className="participant-count">
            {convo.participants.length} participants
          </span>
        </div>
        <div className="chat-actions">
          <span className="chat-type">
            {convo.isGroup ? "👥 Group" : "💬 Private"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {convo.messages.map((msg, index) => {
          const isCurrentUser = msg.sender === "user_001";
          const showDate =
            index === 0 ||
            new Date(msg.timestamp).toDateString() !==
              new Date(convo.messages[index - 1].timestamp).toDateString();

          return (
            <React.Fragment key={index}>
              {showDate && (
                <div className="date-divider">
                  <span>{formatDate(msg.timestamp)}</span>
                </div>
              )}
              <div
                className={`message ${isCurrentUser ? "message-right" : "message-left"}`}
              >
                <div className="message-bubble">
                  {!convo.isGroup && !isCurrentUser && (
                    <div className="sender-name">
                      {getSenderName(msg.sender)}
                    </div>
                  )}
                  {convo.isGroup && !isCurrentUser && (
                    <div className="sender-name">
                      {getSenderName(msg.sender)}
                    </div>
                  )}
                  <div className="message-text">{msg.message}</div>
                  <div className="message-time">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Input Area */}
      <form className="input-area" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Messages;
