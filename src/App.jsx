import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import LogPage from './Pages/LogPage'
import NavBar from './Components/NavBar/NavBar.jsx'
import Home from './Pages/Home'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LogPage />} />
        <Route path="/home/:id?" element={<Home />} />
      </Routes>
    </>
  );
}

export default App
