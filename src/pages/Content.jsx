import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'
import LazyPreviewVideo from '../components/LazyPreviewVideo'
import './Content.css'

const contentItems = [
  {
    id: 1,
    title: 'Agora',
    type: 'video',
    src: '/content-creator/Agora.mp4',
    previewSrc: '/content-creator/Agora-preview.mp4',
    poster: '/content-creator/Agora-poster.jpg'
  },
  {
    id: 2,
    title: 'Santa Patrona',
    type: 'video',
    src: '/content-creator/SantaPatrona1.mp4',
    previewSrc: '/content-creator/SantaPatrona1-preview.mp4',
    poster: '/content-creator/SantaPatrona1-poster.jpg'
  },
  {
    id: 3,
    title: 'Toia de Kiev',
    type: 'video',
    src: '/content-creator/Toia1.mp4',
    previewSrc: '/content-creator/Toia1-preview.mp4',
    poster: '/content-creator/Toia1-poster.jpg'
  },
  {
    id: 4,
    title: 'Agora',
    type: 'video',
    src: '/content-creator/Agora2.mp4',
    previewSrc: '/content-creator/Agora2-preview.mp4',
    poster: '/content-creator/Agora2-poster.jpg'
  },
  {
    id: 5,
    title: 'Maika Spa',
    type: 'video',
    src: '/content-creator/MaikaSpa.mp4',
    previewSrc: '/content-creator/MaikaSpa-preview.mp4',
    poster: '/content-creator/MaikaSpa-poster.jpg'
  },
  {
    id: 6,
    title: 'Santa Patrona',
    type: 'video',
    src: '/content-creator/SantaPatrona2.mp4',
    previewSrc: '/content-creator/SantaPatrona2-preview.mp4',
    poster: '/content-creator/SantaPatrona2-poster.jpg'
  },
  {
    id: 7,
    title: 'Toia de Kiev',
    type: 'video',
    src: '/content-creator/Toia2.mp4',
    previewSrc: '/content-creator/Toia2-preview.mp4',
    poster: '/content-creator/Toia2-poster.jpg'
  },
  {
    id: 8,
    title: 'Toia de Kiev',
    type: 'video',
    src: '/content-creator/Toia3.mp4',
    previewSrc: '/content-creator/Toia3-preview.mp4',
    poster: '/content-creator/Toia3-poster.jpg'
  }
]

function Content() {
  const { language } = useLanguage()
  const [selectedItem, setSelectedItem] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const [modalVideoLoaded, setModalVideoLoaded] = useState(false)
  const [areReelCardsVisible, setAreReelCardsVisible] = useState(false)

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
      setAreReelCardsVisible(true)
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [])

  const translations = {
    en: {
      title: 'Content Creator',
      description: 'I can create the content your brand needs: I learn your identity, your goals, and your audience — then develop everything from the idea and the script, to the final shoot. Strategy and execution in one place.',
      galleryTitle: 'Recent Projects',
      servicesSubtitle: "Let's talk. Tell me what you need and we'll figure it out together."
    },
    es: {
      title: 'Creadora de Contenido',
      description: 'Puedo crear el contenido que tu marca necesita: conozco tu identidad, tus objetivos y tu audiencia, y desarrollo desde la idea y el guión, hasta la grabación final. Estrategia y ejecución en un mismo lugar.',
      galleryTitle: 'Proyectos Recientes',
      servicesSubtitle: 'Charlemos. Contame qué necesitás y lo pensamos juntos.'
    }
  }

  const t = translations[language]

  return (
    <div className="content-page">
      <div className="content-wrapper">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-description">{t.description}</p>
        <p className="services-closing">{t.servicesSubtitle}</p>

        <div className={`reel-gallery reel-gallery-animated ${areReelCardsVisible ? 'reel-gallery-visible' : ''}`}>
          {contentItems.map((item) => (
            <div
              key={item.id}
              className="reel-card-wrapper"
              onClick={() => { setSelectedItem(item); setModalVideoLoaded(false) }}
            >
              <h3 className="reel-card-title">{item.title}</h3>
              <div className="reel-card">
                {item.type === 'video' ? (
                  <LazyPreviewVideo
                    src={item.previewSrc || item.src}
                    poster={item.poster}
                    className="reel-card-media"
                    skeletonClassName="reel-card-skeleton"
                    onContextMenu={handleImageContextMenu}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="reel-card-media"
                    loading="lazy"
                    decoding="async"
                    onContextMenu={handleImageContextMenu}
                  />
                )}
                {item.type === 'video' && (
                  <div className="video-play-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
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
              <>
                {!modalVideoLoaded && !selectedItem.poster && <div className="modal-video-skeleton" />}
                <video
                  key={selectedItem.src}
                  src={selectedItem.src}
                  className="modal-image"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={selectedItem.poster}
                  onLoadedData={() => setModalVideoLoaded(true)}
                  onCanPlay={() => setModalVideoLoaded(true)}
                  onContextMenu={handleImageContextMenu}
                />
              </>
            ) : (
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="modal-image"
                decoding="async"
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