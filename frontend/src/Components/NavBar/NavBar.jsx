import React from "react";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { sendProtectedPost } from "../../utils/API";

function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, SetName] = useState("")

  // see if any theme is already set in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      !darkMode ? "dark" : "light",
    );

    // save the theme in localStorage
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  async function search(e) {
    e.preventDefault();
    console.log("Searching for..", name);
    const response = await sendProtectedPost("http://localhost:3000/api/join-conversation", {name})
    console.log(response)
  }

  return (
    <div className="NavbarContainer">
      <div className="Logo">
        <h1>LinkUp</h1>
      </div>
      <form onSubmit={search} className="searchBar">
        <input type="text" placeholder="Search..." value={name} onChange={(e) => SetName(e.target.value)}/> {/* Added placeholder */}
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
