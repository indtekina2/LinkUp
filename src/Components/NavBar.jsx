import React from "react";
import './NavBar.css'

function NavBar() {
  function search(event) {
    event.preventDefault(); // Prevent form from reloading the page
    console.log("Searching for.. Nothing");
  }

  return (
    <div className="NavbarContainer">
      <div className="Logo">
        <h1>LinkUp</h1>
      </div>
      <form onSubmit={search} className="searchBar" aria-placeholder="Search...">
        {" "}
        <input type="text" />
        <button type="submit">Search</button> 
      </form>
    </div>
  );
}

export default NavBar;