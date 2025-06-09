
import React, { useState, useEffect } from 'react'

const Library = () => {
  const [playlists, setPlaylists] = useState([])
  const [recentTracks, setRecentTracks] = useState([])

  useEffect(() => {
    // Simular playlists criadas pelo usuário
    setPlaylists([
      { id: 1, name: 'Minhas Curtidas', count: 45, image: '🎵' },
      { id: 2, name: 'Descobertas da Semana', count: 30, image: '🆕' },
      { id: 3, name: 'Playlist Chill', count: 25, image: '😌' },
      { id: 4, name: 'Workout Mix', count: 20, image: '💪' },
    ])

    // Buscar algumas músicas recentes
    const fetchRecentTracks = async () => {
      try {
        const response = await fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=trending', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '51a182675dmsh0fa2875eb748722p1e8a32jsna966d23de03e',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        })
        const data = await response.json()
        setRecentTracks(data.data?.slice(0, 8) || [])
      } catch (err) {
        console.error('Erro ao buscar músicas recentes:', err)
      }
    }

    fetchRecentTracks()
  }, [])

  const createPlaylist = () => {
    const newPlaylist = {
      id: Date.now(),
      name: `Nova Playlist #${playlists.length + 1}`,
      count: 0,
      image: '📝'
    }
    setPlaylists([...playlists, newPlaylist])
  }

  return (
    <div style={{ 
      padding: '2rem', 
      background: '#121212', 
      minHeight: 'calc(100vh - 70px)', 
      color: 'white' 
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#1db954',
            margin: 0
          }}>
            📚 Sua Biblioteca
          </h1>
          <button
            onClick={createPlaylist}
            style={{
              padding: '0.8rem 1.5rem',
              borderRadius: '25px',
              border: 'none',
              background: '#1db954',
              color: 'black',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ➕ Criar Playlist
          </button>
        </div>

        {/* Seção de Playlists */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1.5rem',
            color: '#b3b3b3'
          }}>
            Suas Playlists
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                style={{
                  background: '#181818',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#282828'
                  e.target.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#181818'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {playlist.image}
                </div>
                <h3 style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: '0 0 0.5rem 0'
                }}>
                  {playlist.name}
                </h3>
                <p style={{
                  color: '#b3b3b3',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {playlist.count} músicas
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Músicas Recentes */}
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1.5rem',
            color: '#b3b3b3'
          }}>
            Tocadas Recentemente
          </h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {recentTracks.map((track, index) => (
              <div
                key={track.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2a2a2a'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  marginRight: '1rem',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={track.album?.cover_small} 
                    alt={track.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {track.title}
                  </h4>
                  <p style={{
                    color: '#b3b3b3',
                    fontSize: '0.85rem',
                    margin: 0
                  }}>
                    {track.artist?.name}
                  </p>
                </div>
                <div style={{
                  color: '#b3b3b3',
                  fontSize: '0.85rem'
                }}>
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library
