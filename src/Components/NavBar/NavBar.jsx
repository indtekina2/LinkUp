import React from "react";
import "./NavBar.css";
import { useEffect, useState } from "react";

function NavBar() {
  // Move state and function to the main component
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      !darkMode ? "dark" : "light",
    );
  };

  function search(event) {
    event.preventDefault(); // Prevent form from reloading the page
    console.log("Searching for.. Nothing");
  }

  return (
    <div className="NavbarContainer">
      <div className="Logo">
        <h1>LinkUp</h1>
      </div>
      <form
        onSubmit={search}
        className="searchBar"
        aria-placeholder="Search..."
      >
        <input type="text" />
        <button type="submit">Search</button>
      </form>

      <button
        onClick={toggleTheme}
        style={{
          background: "none",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
          padding: "10px",
          borderRadius: "50%",
          transition: "background 0.3s",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => (e.target.style.background = "rgba(0,0,0,0.1)")}
        onMouseLeave={(e) => (e.target.style.background = "transparent")}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default NavBar;
