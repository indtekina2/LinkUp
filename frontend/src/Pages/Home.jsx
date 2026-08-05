import React, { useState, useEffect } from "react";
import Contacts from "../Components/Contact/Contacts";
import { useParams, useNavigate } from "react-router-dom";
import Messages from "../Components/Messages/Messages";
import "./Home.css";
import { isAuthenticated } from "../utils/API";
import {
  getCurrentUserData,
  getAllUsers,
  getConversation,
} from "../assets/data";

function Home() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);

  // all the data
  const [displayContact, setDisplayContact] = useState("");
  const [displayMessages, setDisplayMessages] = useState("");

  async function loadData() {
    const currentUser = await getCurrentUserData();
    if (!currentUser) return;

    const usersData = await getAllUsers(currentUser.participants);
    console.log(currentUser.conversations);

    const conversationsData = await Promise.all(
      currentUser.conversations.map((id) => getConversation(id)),
    );

    setUsers([currentUser, ...usersData]);
    setConversations(conversationsData);
  }

  useEffect(() => {
    async function fetchData() {
      await loadData();
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (id === undefined) {
      setDisplayContact("displayOnPhone");
      setDisplayMessages("hideOnPhone");
    } else {
      setDisplayContact("hideOnPhone");
      setDisplayMessages("displayOnPhone");
    }
  }, [id]);

  return (
    <div className="container">
      <Contacts
        users={users}
        conversations={conversations}
        visibilityClass={displayContact}
      />

      <Messages
        id={id}
        users={users}
        conversations={conversations}
        setConversations={setConversations}
        visibilityClass={displayMessages}
      />
    </div>
  );
}

export default Home;
