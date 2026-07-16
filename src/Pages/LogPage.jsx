import React from "react";
import { useState } from "react";
import "./LogPage.css";

function LogPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    username: null,
    password: null
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // The formate I am going to use to store the data...
    user.username = username;
    user.password = password;

    console.log("Username:", user.username);
    console.log("Password:", user.password);
  };;

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="full-btn">
            Sign In
          </button>
          <button type="submit" className="empty-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogPage;
