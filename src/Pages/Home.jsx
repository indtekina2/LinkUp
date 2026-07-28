import React from 'react'
import Contacts from '../Components/Contact/Contacts'
import { useParams } from "react-router-dom";
import Messages from '../Components/Messages/Messages';
import './Home.css'

function Home() {
  const { id } = useParams();
  console.log(id);

  let display;

  if(id === undefined){
    display = "none";
  }

  return (
    <div className="container">
      <Contacts />
      <Messages id={id} display={display}/>
    </div>
  );
}

export default Home