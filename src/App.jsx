import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
//import './App.css'
import Home from './pages/Home'
import RandoSet from './pages/RandoSet'

function App() {
  return (
    <Router>
      <nav>
        <div id='Links'>
            <Link to="/">Home</Link> | <Link to="/RandoSet">Rando Set</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/RandoSet' element={<RandoSet />} />
      </Routes>
    </Router>
  )
}

export default App
