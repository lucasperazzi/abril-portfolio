import { useState } from 'react'
import { useLanguage } from '../LanguageContext'
import ReelModal from './ReelModal'

function ActrizSection({ description }) {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const translations = {
    en: {
      title: 'Actriz',
      watchReel: 'Ver Reel'
    },
    es: {
      title: 'Actriz',
      watchReel: 'Ver Reel'
    }
  }

  const t = translations[language]

  const handleImageContextMenu = (e) => {
    e.preventDefault()
  }

  return (
    <section className="actriz-section">
      {/* Background image */}
      <img
        src="/Abril3.jpeg"
        alt="Abril Bianco"
        className="actriz-background"
        onContextMenu={handleImageContextMenu}
      />

      {/* Dark overlay */}
      <div className="actriz-overlay" />

      {/* Content */}
      <div className="actriz-content">
        <h1 className="actriz-title">{t.title}</h1>

        <button
          className="actriz-button"
          onClick={() => setIsOpen(true)}
        >
          {t.watchReel}
        </button>

        {description && (
          <p className="actriz-description">{description}</p>
        )}
      </div>

      <ReelModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </section>
  )
}

export default ActrizSection