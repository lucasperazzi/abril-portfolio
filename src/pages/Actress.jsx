import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'
import ReelHeroVideo from '../components/ReelHeroVideo'
import LazyPreviewVideo from '../components/LazyPreviewVideo'
import './Actress.css'

function Actress() {
  const { language } = useLanguage()
  const [selectedItem, setSelectedItem] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const [isGalleryVisible, setIsGalleryVisible] = useState(false)

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

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setIsGalleryVisible(true)
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [])



  const translations = {
    en: {
      title: 'Actress',
      reelTitle: 'My Acting Reel'
    },
    es: {
      title: 'Actriz',
      reelTitle: 'Mi Reel Actoral'
    }
  }

  const t = translations[language]

  const items = [
    {
      id: 1,
      title: 'Acting Reel',
      type: 'video',
      src: '/actress/reel_converted.mp4',
      previewSrc: '/actress/reel_converted-preview.mp4',
      poster: '/actress/reel_converted-poster.jpg'
    },
    { id: 2, title: 'Film Scene 1', type: 'image', src: '/actress/Abril1.jpeg' },
    { id: 3, title: 'Film Scene 2', type: 'image', src: '/actress/Abril2.jpeg' },
    { id: 4, title: 'Theater Performance 1', type: 'image', src: '/actress/Abril3.jpeg' },
    { id: 5, title: 'Theater Performance 2', type: 'image', src: '/actress/Abril4.jpeg' },
    { id: 6, title: 'TV Appearance 1', type: 'image', src: '/actress/Abril5.jpeg' }
  ]

  return (
    <div className="actress-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">{t.title}</h1>
          <ReelHeroVideo
            previewSrc="/videos/MIX LALALAND OK-720p.mp4"
            fullSrc="/videos/MIX LALALAND OK-1080p.mp4"
            poster="/videos/MIX LALALAND OK-poster.webp"
            title={t.reelTitle}
            onContextMenu={handleImageContextMenu}
          />
        </div>
        <div className="page-content">
          <div className={`actress-gallery actress-gallery-animated ${isGalleryVisible ? 'actress-gallery-visible' : ''}`}>
            {items.map((item, index) => (
              <figure
                key={item.id}
                className={`actress-item actress-item--${index + 1}`}
                onClick={() => setSelectedItem(item)}
              >
                {item.type === 'video' ? (
                  <LazyPreviewVideo
                    src={item.previewSrc || item.src}
                    poster={item.poster}
                    className="actress-item__media"
                    onContextMenu={handleImageContextMenu}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="actress-item__media"
                    loading="lazy"
                    decoding="async"
                    onContextMenu={handleImageContextMenu}
                  />
                )}
                <figcaption className="actress-item__caption">
                  <span className="actress-item__caption-num">{String(index + 1).padStart(2, '0')}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {(selectedItem || isClosing) && (
        <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedItem.type === 'video' ? (
              <video key={selectedItem.src} src={selectedItem.src} className="modal-image" controls autoPlay playsInline preload="metadata" poster={selectedItem.poster} onContextMenu={handleImageContextMenu} />
            ) : (
              <img src={selectedItem.src} alt={selectedItem.title} className="modal-image" decoding="async" onContextMenu={handleImageContextMenu} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Actress