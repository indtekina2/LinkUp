import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./utils/API";


import LogPage from "./Pages/LogPage";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Home from "./Pages/Home";

function App() {

  const navigate = useNavigate();

  // check if the user can access which page
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    isAuthenticated(token).then((auth) => {
      if (!auth) {
        navigate("/login/login");
      }else if(auth && window.location.pathname === "/login/login") {
        navigate("/home");
      }
    });
  });

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login/:work" element={<LogPage />} />
        <Route path="/home/:id?" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
