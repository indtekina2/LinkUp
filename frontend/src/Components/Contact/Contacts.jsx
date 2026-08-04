import React from "react";
import "./Contacts.css";
import ContactCard from "../Cards/ContactCard.jsx";
import { useNavigate } from "react-router-dom";

function Contacts({ visibilityClass, users, conversations }) {
  const navigate = useNavigate();

  const newGroup = () => {
    navigate("/login/new-group");
  };
  const joinGroup = () => {
    navigate("/login/join-group");
  };

  // Sort conversations by most recent message timestamp
  const getLastMessageTimestamp = (conversation) => {
    if (!conversation.messages || conversation.messages.length === 0) {
      return new Date(0); // Return epoch time for conversations with no messages
    }

    // Find the most recent message timestamp
    const lastMessage = conversation.messages.reduce((latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp)
        ? current
        : latest;
    });

    return new Date(lastMessage.timestamp);
  };

  // Sort conversations in descending order (most recent first)
  const sortedConversations = [...conversations].sort((a, b) => {
    const timeA = getLastMessageTimestamp(a);
    const timeB = getLastMessageTimestamp(b);
    return timeB - timeA; // Descending order
  });

  return (
    <div className={`Contacts_Container ${visibilityClass}`}>
      <div className="Contacts_Header">
        <h2>Contacts</h2>
        <span className="Contact_Count">{conversations.length}</span>
      </div>

      <div className="Contacts_List">
        {sortedConversations.map((conversation, index) => (
          <ContactCard
            users={users}
            key={conversation.id}
            conversation={conversation}
            style={{ animationDelay: `${index * 0.08}s` }}
          />
        ))}
      </div>

      <div className="Contacts_Footer">
        <button className="Join_Group_Button" onClick={joinGroup}>
          Join Group
        </button>
        <button className="New_Group_Button" onClick={newGroup}>
          New Group
        </button>
      </div>
    </div>
  );
}

export default Contacts;
