import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/API';
import { socket } from '../socket';

function RedirectClient() {
    const navigate = useNavigate()
    useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");
      
      const auth = await isAuthenticated(token);
      console.log(auth);

      if (!auth) {
        localStorage.setItem("token", "")
        navigate("/login/login");
        return;
      }

      socket.auth = { token };
      socket.connect();

      navigate('/home')
    }

    checkAuth();

    return () => {
      socket.disconnect();
    };
  }, [navigate]);
  return (
    <div className="center"></div>
  )
}

export default RedirectClient