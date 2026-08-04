import React, { useState } from "react";
import "./Messages.css";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sendProtectedPost, getCurrentUserId } from "../../utils/API";

function Messages({
  id,
  users,
  conversations,
  setConversations,
  visibilityClass,
}) {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  // Find the selected conversation
  console.log("Route id:", id);
  console.log("Conversations:", conversations);
  const convo = conversations.find((conversation) => conversation.id === id);

  // Get the chat name
  const getChatName = () => {
    if (!convo) return "Chat";

    if (convo.isGroup) {
      return convo.name || "Group Chat";
    }

    const otherParticipant = convo.participants.find(
      (p) => p !== getCurrentUserId(),
    );

    const user = users.find((u) => u.id === otherParticipant);

    return user ? user.username : "Unknown User";
  };

  // Get sender name
  const getSenderName = (senderId) => {
    const user = users.find((u) => u.id === senderId);
    return user ? user.username : senderId;
  };

  // Format time
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";

    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

  // Send message
  async function sendMessage(e) {
    e.preventDefault();

    if (!inputText.trim() || !convo) return;

    const newMessage = {
      sender: getCurrentUserId(),
      convoID: id,
      message: inputText,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await sendProtectedPost(
        "http://localhost:3000/api/messages/send",
        newMessage,
      );

      if (!response.success) {
        console.error(response.message);
        return;
      }

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === id
            ? {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              }
            : conversation,
        ),
      );

      setInputText("");
    } catch (error) {
      console.error(error);
    }
  }

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

      <div className="messages-container">
        {convo.messages.map((msg, index) => {
          const isCurrentUser = msg.sender === getCurrentUserId();

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
                className={`message ${
                  isCurrentUser ? "message-right" : "message-left"
                }`}
              >
                <div className="message-bubble">
                  {!isCurrentUser && (
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

      <form className="input-area" onSubmit={sendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Messages;
