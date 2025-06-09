
import React, { useEffect, useState, useRef } from 'react'
import LyricsModal from './LyricsModal'
import './MusicCarousel.css'

const MusicCarousel = () => {
  const [tracks, setTracks] = useState([])
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLyricsOpen, setIsLyricsOpen] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    const fetchMusic = async () => {
      const artists = ['taylor swift', 'the weeknd', 'dua lipa', 'drake', 'billie eilish', 'ed sheeran', 'ariana grande', 'post malone']
      const randomArtist = artists[Math.floor(Math.random() * artists.length)]
      
      try {
        const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${randomArtist}`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '51a182675dmsh0fa2875eb748722p1e8a32jsna966d23de03e',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        })
        const data = await response.json()
        setTracks(data.data.slice(0, 12))
      } catch (err) {
        console.error(err)
      }
    }
    
    fetchMusic()
  }, [])

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

  const showLyrics = (track) => {
    setSelectedTrack(track)
    setIsLyricsOpen(true)
  }

  return (
    <div className="carousel">
      <audio ref={audioRef} onEnded={handleAudioEnd} />
      {tracks.map((track) => (
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
          <button 
            className="lyrics-button"
            onClick={(e) => {
              e.stopPropagation()
              showLyrics(track)
            }}
            title="Ver letra"
          >
            📝
          </button>
        </div>
      ))}
      
      <LyricsModal 
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
        track={selectedTrack}
      />
    </div>
  )
}

export default MusicCarousel
