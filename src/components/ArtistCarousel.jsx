
import React, { useEffect, useState } from 'react'
import './ArtistCarousel.css'

const ArtistCarousel = () => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const fetchArtists = async () => {
      const artistNames = ['henrique e juliano', 'diego e victor hugo', 'jorge e mateus', 'ze neto e cristiano', 'matheus e kauan', 'gusttavo lima']
      
      try {
        const artistPromises = artistNames.map(async (artist) => {
          const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '51a182675dmsh0fa2875eb748722p1e8a32jsna966d23de03e',
              'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
          })
          const data = await response.json()
          return data.data[0]?.artist
        })
        
        const artistsData = await Promise.all(artistPromises)
        setArtists(artistsData.filter(artist => artist))
      } catch (err) {
        console.error(err)
      }
    }
    
    fetchArtists()
  }, [])

  return (
    <div className="artist-carousel">
      {artists.map((artist, index) => (
        <div className="artist-card" key={artist.id || index}>
          <div className="artist-image">
            <img src={artist.picture_medium || artist.picture} alt={artist.name} />
            <div className="play-button">▶</div>
          </div>
          <h3>{artist.name}</h3>
          <p>Artista</p>
        </div>
      ))}
    </div>
  )
}

export default ArtistCarousel
