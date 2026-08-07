import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./utils/API";

import LogPage from "./Pages/LogPage";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Home from "./Pages/Home";
import { socket } from "./socket.js";
import RedirectClient from "./Pages/RedirectClient.jsx";

function App() {
  const navigate = useNavigate();

  // check if the user can access which page
  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");
      
      const auth = await isAuthenticated(token);
      // console.log(auth);

      if (!auth) {
        localStorage.setItem("token", "")
        navigate("/login/login");
        return;
      }

      socket.auth = { token };
      socket.connect();

      if (window.location.pathname === "/login/login") {
        navigate("/home");
      }
    }

    checkAuth();

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login/:work" element={<LogPage />} />
        <Route path="/home/:id?" element={<Home />} />
        <Route path="*" element={<RedirectClient />}/>
      </Routes>
    </>
  );
}

export default App;
