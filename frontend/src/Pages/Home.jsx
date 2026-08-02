import React from "react";
import Contacts from "../Components/Contact/Contacts";
import { useParams } from "react-router-dom";
import Messages from "../Components/Messages/Messages";
import "./Home.css";
import {users} from "../assets/data"
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/API";

function Home() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  // for responsive design
  let displayContact, displayMessages;

  if (id === undefined) {
    displayContact = "displayOnPhone";
    displayMessages = "hideOnPhone";
  } else {
    displayContact = "hideOnPhone";
    displayMessages = "displayOnPhone";
  }

  return (
    <div className="container">
      <Contacts visibilityClass={displayContact} />
      <Messages id={id} visibilityClass={displayMessages} />
    </div>
  );
}

export default Home;
