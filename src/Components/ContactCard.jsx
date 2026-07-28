import React from "react";
import "./ContactCard.css"

function ContactCard({ conversation }) {
  // Determine the class based on group status
  let className = "isGroup";
  if (conversation.isGroup === true) {
    className = "isGroup";
  } else if (conversation.isGroup === false) {
    className = "isPrivate";
  } else {
    className = "isUnknown";
    console.log("Yeah... There is an error probably");
  }

  // Get the last message
  const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) {
      return { message: "No messages yet", sender: null };
    }
    return messages.reduce((latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp)
        ? current
        : latest;
    });
  };

  // Get the other participant (for private chats)
  const getOtherParticipant = (participants, currentUser) => {
    if (!participants || participants.length === 0) return null;
    if (participants.length === 1) return participants[0];
    return participants.find((p) => p !== currentUser) || participants[0];
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // If today, show time
    if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    // If within 7 days, show day name
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString([], { weekday: "short" });
    }
    // Otherwise show date
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  // Get text logo (first letter of name or participants)
  const getTextLogo = () => {
    const currentUser = "user_001";
    const isCurrentUserParticipant =
      conversation.participants?.includes(currentUser);

    if (conversation.isGroup) {
      // For groups, use first letters of all participants or group name
      if (conversation.name) {
        return conversation.name.charAt(0).toUpperCase();
      }
      const participants = conversation.participants || [];
      if (participants.length === 0) return "G";
      // Take first letter of each participant
      return participants
        .slice(0, 3)
        .map((p) => p.replace("user_", "").charAt(0))
        .join("")
        .toUpperCase();
    } else {
      // For private chats, show other person's initial
      const otherUser = getOtherParticipant(
        conversation.participants,
        currentUser,
      );
      if (!otherUser) return "?";
      return otherUser.replace("user_", "").charAt(0).toUpperCase();
    }
  };

  // Get display name
  const getDisplayName = () => {
    const currentUser = "user_001";

    if (conversation.isGroup) {
      return conversation.name || "Group Chat";
    } else {
      // Private chat - show other person's name
      const otherUser = getOtherParticipant(
        conversation.participants,
        currentUser,
      );
      if (!otherUser) return "Unknown";
      // Convert user_001 to "User 001" or custom display name
      return otherUser.replace("_", " ").toUpperCase();
    }
  };

  // Get the last message
  const lastMessage = getLastMessage(conversation.messages);
  const isCurrentUserSender = lastMessage.sender === "user_001";

  // Check if current user is participant
  const isParticipant =
    conversation.participants?.includes("user_001") || false;

  return (
    <div className={`Contact_Card ${className}`}>
      {/* Avatar / Text Logo */}
      <div className="avatar">
        <span className="text-logo">{getTextLogo()}</span>
      </div>

      {/* Content */}
      <div className="content">
        <div className="header">
          <h3 className="name">{getDisplayName()}</h3>
          {lastMessage.timestamp && (
            <span className="timestamp">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>

        <div className="preview">
          {lastMessage.message && (
            <p className="message-preview">
              {isCurrentUserSender && (
                <span className="sender-label">You: </span>
              )}
              {lastMessage.message}
            </p>
          )}
          {!isParticipant && (
            <span className="not-participant-badge">Not a participant</span>
          )}
        </div>
      </div>

      {/* Optional: Unread indicator */}
      {isParticipant && (
        <div className="status-indicator">
          <span className="online-dot"></span>
        </div>
      )}
    </div>
  );
}

export default ContactCard;
