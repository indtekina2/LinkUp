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
    password: null
  }

  console.log(work);

  const handleSubmit = (e) => {
    e.preventDefault();

    // The formate I am going to use to store the data...
    information.name = name;
    information.password = password;

    console.log("Name:", information.name);
    console.log("Password:", information.password);   

    navigate("/home");
  };

  console.log(work);

  // setting the header and subheader text based on the work prop
  let header_container;
  let headerText, subHeaderText;
  if (work === "login") {
    headerText = "Welcome Back";
    subHeaderText = "Sign in to your account";
    header_container = "header-container_login";
  }else if (work === "new-group" || work === "join-group") {
    headerText = "Create or Join a Group";
    subHeaderText = "Sign in to your group account";
    header_container = "header-container_group";
  }else {
    console.error("Invalid work prop value:", work);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className={header_container}>
            {/* Back Button */}
            <button
              className="return-button"
              onClick={() => navigate("/home")}
              style={
                work === "login" ? { display: "none" } : { display: "block" }
              }
            >
              <ArrowLeft size={20} />
            </button>

            {/* Header and Subheader */}
            <h2>{headerText}</h2>
          </div>
          <p>{subHeaderText}</p>
        </div>

        {/* the main login form */}
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="full-btn">
            {work === "login"
              ? "Login"
              : work === "new-group"
                ? "Create Group"
                : "Join Group"}
          </button>
          <button type="submit" className="empty-btn">
            {work === "login"
              ? "Create New Group"
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
