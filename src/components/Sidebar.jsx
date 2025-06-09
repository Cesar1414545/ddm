
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="spotify-logo">
          🎵
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="nav-icon">🏠</span>
          Início
        </Link>
        <Link to="/search" className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
          <span className="nav-icon">🔍</span>
          Buscar
        </Link>
        <Link to="/library" className={`nav-item ${location.pathname === '/library' ? 'active' : ''}`}>
          <span className="nav-icon">📚</span>
          Sua Biblioteca
        </Link>
      </nav>

      <div className="library-section">
        <div className="library-header">
          <h3>Sua Biblioteca</h3>
          <button className="add-btn">+</button>
        </div>
        
        <div className="playlist-item">
          <div className="playlist-info">
            <h4>Crie sua primeira playlist</h4>
            <p>É fácil, vamos te ajudar.</p>
            <button className="create-playlist-btn">Criar playlist</button>
          </div>
        </div>

        <div className="podcast-item">
          <div className="podcast-info">
            <h4>Que tal seguir um podcast novo?</h4>
            <p>Atualizaremos você sobre novos episódios.</p>
            <button className="explore-podcasts-btn">Explorar podcasts</button>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="language-selector">
          <span>🌐 Português do Brasil</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
