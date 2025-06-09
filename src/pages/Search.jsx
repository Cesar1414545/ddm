
import React, { useState } from 'react'
import '../components/MusicCarousel.css'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioRef] = useState(React.createRef())

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerm}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '51a182675dmsh0fa2875eb748722p1e8a32jsna966d23de03e',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      })
      const data = await response.json()
      setSearchResults(data.data || [])
    } catch (err) {
      console.error('Erro na busca:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const playTrack = (track) => {
    if (currentPlaying === track.id && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.preview
        audioRef.current.play()
        setCurrentPlaying(track.id)
        setIsPlaying(true)
      }
    }
  }

  const handleAudioEnd = () => {
    setCurrentPlaying(null)
    setIsPlaying(false)
  }

  return (
    <div style={{ 
      padding: '2rem', 
      background: '#121212', 
      minHeight: 'calc(100vh - 70px)', 
      color: 'white' 
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: '#1db954' 
        }}>
          🔍 Buscar
        </h1>
        
        <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            maxWidth: '600px' 
          }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="O que você quer ouvir?"
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '25px',
                border: 'none',
                background: '#2a2a2a',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: '1rem 2rem',
                borderRadius: '25px',
                border: 'none',
                background: '#1db954',
                color: 'black',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                minWidth: '100px'
              }}
            >
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div>
            <h2 style={{ marginBottom: '1rem', color: '#b3b3b3' }}>
              Resultados para "{searchTerm}"
            </h2>
            <audio ref={audioRef} onEnded={handleAudioEnd} />
            <div className="carousel" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
              {searchResults.slice(0, 20).map((track) => (
                <div className="track" key={track.id}>
                  <div className="track-image">
                    <img src={track.album.cover_medium} alt={track.title} />
                    <div 
                      className="play-button"
                      onClick={() => playTrack(track)}
                    >
                      {currentPlaying === track.id && isPlaying ? '⏸' : '▶'}
                    </div>
                  </div>
                  <h3>{track.title}</h3>
                  <p>{track.artist.name}</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    {track.album.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchTerm && searchResults.length === 0 && !isLoading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#b3b3b3' 
          }}>
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente buscar por outro artista ou música</p>
          </div>
        )}

        {!searchTerm && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#b3b3b3' 
          }}>
            <h3>Comece a digitar para buscar</h3>
            <p>Encontre seus artistas, álbuns e músicas favoritas</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
