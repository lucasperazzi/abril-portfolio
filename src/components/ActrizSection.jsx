import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'

function ActrizSection({ description, onOpenReel }) {
  const { language } = useLanguage()
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  const translations = {
    en: {
      title: 'Actress',
      watchReel: 'Watch Reel'
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

  const handleScrollDown = () => {
    const gallerySection = document.querySelector('.page-content')
    if (gallerySection) {
      const navbarHeight = window.innerWidth >= 769 ? 64 : 56
      const elementPosition = gallerySection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="actriz-section">
      {/* Background image */}
      <img
        src="/actress/Abril3.jpeg"
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
          onClick={onOpenReel}
        >
          {t.watchReel}
        </button>

        {description && (
          <p className="actriz-description">{description}</p>
        )}
      </div>

      {/* Scroll down indicator */}
      <button
        className={`scroll-down-indicator ${!showScrollIndicator ? 'hidden' : ''}`}
        onClick={handleScrollDown}
        aria-label="Scroll down"
      >
        <span className="scroll-arrow">↓</span>
      </button>
    </section>
  )
}

export default ActrizSection