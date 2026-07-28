import React from "react";
import "./ContactCard.css"
import { useNavigate } from "react-router-dom";
import { users } from "../../assets/data";

function ContactCard({ conversation, currentUserId = "user_001" }) {

   const navigate = useNavigate();

   function openUser() {
     navigate(`/home/${conversation.id}`);
   }

  // Helper function to get username by ID
  const getUsername = (userId) => {
    if (!userId) return "Unknown";
    const user = users.find(u => u.id === userId);
    return user ? user.username : userId.replace('_', ' ').toUpperCase();
  };

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
    return participants.find(p => p !== currentUser) || participants[0];
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // If today, show time
    if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // If within 7 days, show day name
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Get text logo (first letter of username or participants)
  const getTextLogo = () => {
    const currentUser = currentUserId;
    const isCurrentUserParticipant = conversation.participants?.includes(currentUser);
    
    if (conversation.isGroup) {
      // For groups, use first letters of all participants or group name
      if (conversation.name) {
        return conversation.name.charAt(0).toUpperCase();
      }
      const participants = conversation.participants || [];
      if (participants.length === 0) return "G";
      // Take first letter of each participant's username
      return participants
        .slice(0, 3)
        .map(p => {
          const user = users.find(u => u.id === p);
          return user ? user.username.charAt(0).toUpperCase() : p.charAt(0).toUpperCase();
        })
        .join('');
    } else {
      // For private chats, show other person's initial
      const otherUser = getOtherParticipant(conversation.participants, currentUser);
      if (!otherUser) return "?";
      const user = users.find(u => u.id === otherUser);
      return user ? user.username.charAt(0).toUpperCase() : otherUser.charAt(0).toUpperCase();
    }
  };

  // Get display name
  const getDisplayName = () => {
    const currentUser = currentUserId;
    
    if (conversation.isGroup) {
      return conversation.name || "Group Chat";
    } else {
      // Private chat - show other person's username
      const otherUser = getOtherParticipant(conversation.participants, currentUser);
      if (!otherUser) return "Unknown";
      return getUsername(otherUser);
    }
  };

  // Get the last message
  const lastMessage = getLastMessage(conversation.messages);
  const isCurrentUserSender = lastMessage.sender === currentUserId;

  // Check if current user is participant
  const isParticipant = conversation.participants?.includes(currentUserId) || false;

  // Get sender username for preview
  const getSenderName = (senderId) => {
    if (senderId === currentUserId) return "You";
    return getUsername(senderId);
  };

  return (
    <div className={`Contact_Card ${className}`} onClick={openUser}>
      {/* Avatar / Text Logo */}
      <div className="avatar">
        <span className="text-logo">{getTextLogo()}</span>
      </div>

      {/* Content */}
      <div className="content">
        <div className="header">
          <h3 className="name">{getDisplayName()}</h3>
          {lastMessage.timestamp && (
            <span className="timestamp">{formatTime(lastMessage.timestamp)}</span>
          )}
        </div>

        <div className="preview">
          {lastMessage.message && (
            <p className="message-preview">
              <span className="sender-label">{getSenderName(lastMessage.sender)}: </span>
              {lastMessage.message}
            </p>
          )}
          {!isParticipant && (
            <span className="not-participant-badge">Not a participant</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactCard;