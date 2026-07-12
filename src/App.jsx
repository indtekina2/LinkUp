import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import LogPage from './Pages/LogPage'
import NavBar from './Components/NavBar'

function App() {
  return (
    <>
    <NavBar/>
      <LogPage />
    </>
  )
}

export default App
