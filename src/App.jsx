import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Search from './pages/Search'
import Library from './pages/Library'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App