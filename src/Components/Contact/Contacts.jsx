import React from 'react'
import './Contacts.css'
import ContactCard from '../Cards/ContactCard.jsx'
import {conversations} from '../../assets/data.js'

function Contacts() {
  return (
      <div className="Contacts_Container">
        <div className="Contacts_Header">
          <h2>Contacts</h2>
          <span className="Contact_Count">{conversations.length}</span>
        </div>

        <div className="Contacts_List">
          {conversations.map((conversation) => (
            <ContactCard key={conversation.id} conversation={conversation} />
          ))}
        </div>
      </div>
  );
}

export default Contacts