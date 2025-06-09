
import React from 'react'
import MusicCarousel from '../components/MusicCarousel'
import ArtistCarousel from '../components/ArtistCarousel'

const Home = () => {
  return (
    <div style={{ 
      padding: '2rem 3rem', 
      background: 'linear-gradient(180deg, #1f1f1f 0%, #121212 100%)', 
      minHeight: 'calc(100vh - 70px)', 
      color: 'white'
    }}>
      {/* Header com navegação */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: 'none',
            color: 'white',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}>❮</button>
          <button style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: 'none',
            color: 'white',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}>❯</button>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={{
            background: 'transparent',
            border: '1px solid #727272',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>Premium</button>
          <button style={{
            background: 'transparent',
            border: '1px solid #727272',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>Suporte</button>
          <button style={{
            background: 'transparent',
            border: '1px solid #727272',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>Baixar</button>
          <button style={{
            background: '#1db954',
            border: 'none',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>Inscrever-se</button>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>Entrar</button>
        </div>
      </div>

      {/* Seção Músicas em alta */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: 0,
            color: 'white'
          }}>Músicas em alta</h2>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#b3b3b3',
            fontSize: '0.9rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}>Mostrar tudo</button>
        </div>
        <MusicCarousel />
      </section>

      {/* Seção Artistas populares */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: 0,
            color: 'white'
          }}>Artistas populares</h2>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#b3b3b3',
            fontSize: '0.9rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}>Mostrar tudo</button>
        </div>
        <ArtistCarousel />
      </section>

      {/* Seção Singles e álbuns */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: 0,
            color: 'white'
          }}>Singles e álbuns que todo mundo gosta</h2>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#b3b3b3',
            fontSize: '0.9rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}>Mostrar tudo</button>
        </div>
        <MusicCarousel />
      </section>

      {/* Rodapé */}
      <div style={{
        textAlign: 'center',
        marginTop: '4rem',
        padding: '2rem 0',
        borderTop: '1px solid #282828',
        color: '#b3b3b3',
        fontSize: '0.9rem'
      }}>
        <p>🎵 Clone do Spotify • Desenvolvido com React</p>
      </div>
    </div>
  )
}

export default Home
