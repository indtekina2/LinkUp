import React from "react";
import { useState } from "react";
import "./LogPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { users, getCurrentUserData } from "../assets/data";
import { sendPost, sendProtectedPost } from "../utils/API";

function LogPage() {
  const [name, SetName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const work = useParams().work;

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

  async function handleLogin(e) {
    e.preventDefault();
    if (!validateFields()) return;

    information.name = name;
    information.password = password;
    console.log("Logging in with:", information);

    try {
      const data = await sendPost("http://localhost:3000/api/login", {
        username: information.name,
        password: information.password,
      });

      if (data.success) {
        console.log(data.token);
        localStorage.setItem("token", data.token);

        // add the current user to the users array
        getCurrentUserData().then(response=>{
          console.log(response);
        })

        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(`There is an error... Figure it out 🙂🥀:`);
    }
  }

  // signing in new user
  async function handleSignIn(e) {
    e.preventDefault();
    if (!validateFields()) return;

    information.name = name;
    information.password = password;

    try {
      const data = await sendPost("http://localhost:3000/api/signup", {
        name: information.name,
        password: information.password,
      });

      console.log(data.success);

      if (data.success) {
        console.log(data.id);
        localStorage.setItem("token", data.token);

        getCurrentUserData().then((response) => {
          console.log(response);
        });

        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleCreateGroup(e) {
    e.preventDefault();
    if (!validateFields()) return;

    information.name = name;
    information.password = password;
    console.log("Creating new group with:", information);

    // Send a POST request to the backend to create a new group
    try {
      const protectedData = await sendProtectedPost(
        "http://localhost:3000/api/create-group",
        information,
      );
      console.log(protectedData);
      if (protectedData.success) {
        alert("Group created successfully!");

        navigate("/home");
      } else {
        alert(protectedData.message);
      }
    } catch (err) {
      console.error("Boom... Best of luck with: ", err);
    }
  }

  async function handleJoinGroup(e) {
    e.preventDefault();
    if (!validateFields()) return;

    information.name = name;
    information.password = password;

    console.log("Joining group with:", information);

    // Send a POST request to the backend to join an existing group
    try {
      const protectedData = await sendProtectedPost(
        "http://localhost:3000/api/join-group",
        information,
      );
      console.log(protectedData);
      if (protectedData.success) {
        console.log(protectedData.message);
        navigate("/home");
      } else if (!protectedData.success) {
        alert(protectedData.message);
      }
    } catch (err) {
      console.error("Error while joining group:", err);
    }
  }

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
