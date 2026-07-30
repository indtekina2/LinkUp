import React from "react";
import Contacts from "../Components/Contact/Contacts";
import { useParams } from "react-router-dom";
import Messages from "../Components/Messages/Messages";
import "./Home.css";

function Home() {
  const { id } = useParams();
  console.log(id);

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
