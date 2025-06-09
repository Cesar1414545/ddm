
import React, { useState, useEffect } from 'react'
import './LyricsModal.css'

const LyricsModal = ({ isOpen, onClose, track }) => {
  const [lyrics, setLyrics] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen && track) {
      fetchLyrics()
    }
  }, [isOpen, track])

  const fetchLyrics = async () => {
    setIsLoading(true)
    setError('')
    setLyrics('')

    try {
      // Usando uma API de letras (Lyrics.ovh é gratuita)
      const response = await fetch(`https://api.lyrics.ovh/v1/${track.artist.name}/${track.title}`)
      const data = await response.json()
      
      if (data.lyrics) {
        setLyrics(data.lyrics)
      } else {
        setError('Letra não encontrada para esta música.')
      }
    } catch (err) {
      console.error('Erro ao buscar letra:', err)
      setError('Erro ao carregar a letra. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="lyrics-modal-overlay" onClick={onClose}>
      <div className="lyrics-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lyrics-header">
          <div className="track-info">
            <img src={track?.album?.cover_medium} alt={track?.title} />
            <div>
              <h3>{track?.title}</h3>
              <p>{track?.artist?.name}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="lyrics-content">
          {isLoading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Carregando letra...</p>
            </div>
          )}
          
          {error && (
            <div className="error">
              <p>{error}</p>
              <button onClick={fetchLyrics} className="retry-button">
                Tentar Novamente
              </button>
            </div>
          )}
          
          {lyrics && (
            <div className="lyrics-text">
              {lyrics.split('\n').map((line, index) => (
                <p key={index}>{line || '\u00A0'}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LyricsModal
