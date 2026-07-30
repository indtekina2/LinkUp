import React from "react";
import { useState } from "react";
import "./LogPage.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function LogPage({ work }) {
  const [name, SetName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const information = {
    name: null,
    password: null,
  };

  // Validation function
  const validateFields = () => {
    if (!name.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  // Separate handler functions
  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    information.name = name;
    information.password = password;
    console.log("Logging in with:", information);
    // Add your login API call here
    navigate("/home");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    information.name = name;
    information.password = password;

    // Sending JSON data
    fetch("http://localhost:3000/api/signIN", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: information.name,
        password: information.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result.success);
        if (data.result.success === true) {
          navigate("/home");
        } else if (!data.result.success) {
          alert(data.result.message);
        } else {
          console.log("Fahhhh");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    information.name = name;
    information.password = password;
    console.log("Creating new group with:", information);
  };

  const handleJoinGroup = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    information.name = name;
    information.password = password;
  };

  // Setting header and subheader text
  let header_container;
  let headerText, subHeaderText;
  if (work === "login") {
    headerText = "Welcome Back";
    subHeaderText = "Sign in to your account";
    header_container = "header-container_login";
  } else if (work === "new-group" || work === "join-group") {
    headerText = "Create or Join a Group";
    subHeaderText = "Sign in to your group account";
    header_container = "header-container_group";
  } else {
    console.error("Invalid work prop value:", work);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className={header_container}>
            <button
              className="return-button"
              onClick={() => navigate("/home")}
              style={
                work === "login" ? { display: "none" } : { display: "block" }
              }
            >
              <ArrowLeft size={20} />
            </button>
            <h2>{headerText}</h2>
          </div>
          <p>{subHeaderText}</p>
        </div>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              {work === "login" ? "Username" : "Group Name"}
            </label>
            <input
              type="text"
              id="username"
              placeholder={
                work === "login"
                  ? "Enter your username"
                  : "Enter your group name"
              }
              value={name}
              onChange={(e) => SetName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder={
                work === "login"
                  ? "Enter your password"
                  : "Enter your group password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Primary button - changes based on work prop */}
          <button
            type="button"
            className="full-btn"
            onClick={
              work === "login"
                ? handleLogin
                : work === "new-group"
                  ? handleCreateGroup
                  : handleJoinGroup
            }
          >
            {work === "login"
              ? "Log in"
              : work === "new-group"
                ? "Create Group"
                : "Join Group"}
          </button>

          {/* Secondary button - changes based on work prop */}
          <button
            type="button"
            className="empty-btn"
            onClick={
              work === "login"
                ? handleSignIn
                : work === "new-group"
                  ? handleJoinGroup
                  : handleCreateGroup
            }
          >
            {work === "login"
              ? "Sign In"
              : work === "new-group"
                ? "Join Existing Group"
                : "Create New Group"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogPage;
