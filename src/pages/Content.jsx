import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../LanguageContext'
import './Content.css'

function ReelVideo({ src, poster, onContextMenu }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play()
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {})
            }
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className="reel-card-media"
      muted
      loop
      playsInline
      preload="metadata"
      onContextMenu={onContextMenu}
    />
  )
}

function Content() {
  const { language } = useLanguage()
  const [selectedItem, setSelectedItem] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  const handleImageContextMenu = (e) => {
    e.preventDefault()
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedItem(null)
      setIsClosing(false)
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedItem) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedItem])

  useEffect(() => {
    if (selectedItem || isClosing) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedItem, isClosing])

  const translations = {
    en: {
      title: 'Content Creator',
      description: 'Creating compelling digital content that connects with audiences and tells meaningful stories across various platforms and mediums.',
      galleryTitle: 'Recent Projects'
    },
    es: {
      title: 'Creadora de Contenido',
      description: 'Creando contenido digital convincente que conecta con las audiencias y cuenta historias significativas a través de varias plataformas y medios.',
      galleryTitle: 'Proyectos Recientes'
    }
  }

  const t = translations[language]

  const items = [
    { id: 1, title: 'Reel 1', type: 'video', src: '/video/reel_converted.mp4', poster: '/Abril1.jpeg' },
    { id: 2, title: 'Photo Project 1', type: 'image', src: '/Abril2.jpeg' },
    { id: 3, title: 'Reel 2', type: 'video', src: '/video/reel_converted.mp4', poster: '/Abril3.jpeg' },
    { id: 4, title: 'Photo Project 2', type: 'image', src: '/Abril4.jpeg' },
    { id: 5, title: 'Reel 3', type: 'video', src: '/video/reel_converted.mp4', poster: '/Abril5.jpeg' },
    { id: 6, title: 'Social Media 1', type: 'image', src: '/Abril1.jpeg' }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-description">{t.description}</p>
      </div>

      <div className="page-content">
        <h2 className="gallery-title">{t.galleryTitle}</h2>
        <div className="reel-gallery">
          {items.map((item) => (
            <div
              key={item.id}
              className="reel-card-wrapper"
              onClick={() => setSelectedItem(item)}
            >
              <h3 className="reel-card-title">{item.title}</h3>
              <div className="reel-card">
                {item.type === 'video' ? (
                  <ReelVideo
                    src={item.src}
                    poster={item.poster}
                    onContextMenu={handleImageContextMenu}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="reel-card-media"
                    onContextMenu={handleImageContextMenu}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(selectedItem || isClosing) && (
        <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedItem.type === 'video' ? (
              <video
                src={selectedItem.src}
                className="modal-image"
                controls
                autoPlay
                playsInline
                onContextMenu={handleImageContextMenu}
              />
            ) : (
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="modal-image"
                onContextMenu={handleImageContextMenu}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Content