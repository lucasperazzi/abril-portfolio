import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'
import './Content.css'

function Content() {
  const { language } = useLanguage()
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedItem) {
        setSelectedItem(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedItem])

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
    { id: 1, title: 'Video Project 1', image: '/Abril1.jpeg' },
    { id: 2, title: 'Video Project 2', image: '/Abril2.jpeg' },
    { id: 3, title: 'Photo Project 1', image: '/Abril3.jpeg' },
    { id: 4, title: 'Photo Project 2', image: '/Abril4.jpeg' },
    { id: 5, title: 'Social Media 1', image: '/Abril5.jpeg' },
    { id: 6, title: 'Social Media 2', image: '/Abril1.jpeg' }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
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
              <img src={item.image} alt={item.title} className="media-image" />
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <img src={selectedItem.image} alt={selectedItem.title} className="modal-image" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Content