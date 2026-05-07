import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'
import ReelModal from '../components/ReelModal'
import './Actress.css'

function Actress() {
  const { language } = useLanguage()
  const [selectedItem, setSelectedItem] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const [isReelOpen, setIsReelOpen] = useState(false)

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
      title: 'Actress',
      watchReel: 'Watch Reel',
      description: 'Bringing characters to life through the art of performance, with dedication to authentic storytelling and emotional depth in every role.',
      galleryTitle: 'Acting Portfolio'
    },
    es: {
      title: 'Actriz',
      watchReel: 'Ver Reel',
      description: 'Dando vida a los personajes a través del arte de la actuación, con dedicación a la narración auténtica y profundidad emocional en cada papel.',
      galleryTitle: 'Portafolio de Actuación'
    }
  }

  const t = translations[language]

  const items = [
    { id: 1, title: 'Film Scene 1', image: '/Abril1.jpeg' },
    { id: 2, title: 'Film Scene 2', image: '/Abril2.jpeg' },
    { id: 3, title: 'Theater Performance 1', image: '/Abril3.jpeg' },
    { id: 4, title: 'Theater Performance 2', image: '/Abril4.jpeg' },
    { id: 5, title: 'TV Appearance 1', image: '/Abril5.jpeg' },
    { id: 6, title: 'TV Appearance 2', image: '/Abril1.jpeg' }
  ]

  return (
    <div className="actress-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">{t.title}</h1>
          <button className="actress-reel-button" onClick={() => setIsReelOpen(true)}>
            {t.watchReel}
          </button>
          <p className="page-description">{t.description}</p>
        </div>
        <div className="page-content">
          <h2 className="gallery-title">{t.galleryTitle}</h2>
          <div className="content-gallery">
            {items.map((item) => (
              <div
                key={item.id}
                className="media-item"
                onClick={() => setSelectedItem(item)}
              >
                <img src={item.image} alt={item.title} className="media-image" onContextMenu={handleImageContextMenu} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {(selectedItem || isClosing) && (
        <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={selectedItem.image} alt={selectedItem.title} className="modal-image" onContextMenu={handleImageContextMenu} />
          </div>
        </div>
      )}

      <ReelModal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
      />
    </div>
  )
}

export default Actress