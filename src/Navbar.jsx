import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import './Navbar.css'

function Navbar({ isVisible = true, isHomePage = false }) {
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMenuOpen || isClosing) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, isClosing])

  const closeMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsClosing(false)
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  const translations = {
    en: {
      menu: 'Menu',
      home: 'Home',
      contact: 'Contact',
      actress: 'Actress',
      content: 'Content Creator'
    },
    es: {
      menu: 'Menú',
      home: 'Inicio',
      contact: 'Contacto',
      actress: 'Actriz',
      content: 'Creadora de Contenido'
    }
  }

  const t = translations[language]

  const handleLogoClick = (e) => {
    if (isHomePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`top-nav ${isVisible ? 'visible' : ''}`}>
        <div className="nav-content">
          <Link to="/" className="nav-logo" onClick={handleLogoClick}>Abril Bianco</Link>
          <div className="nav-right">
            <button
              className="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {t.menu}
            </button>
            <div className="language-selector">
              <button
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <span className="lang-divider">/</span>
              <button
                className={`lang-btn ${language === 'es' ? 'active' : ''}`}
                onClick={() => setLanguage('es')}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Always visible menu button and language selector for main page */}
      {isMounted && (
        <div className={`floating-nav ${isVisible ? 'hide' : 'show'}`}>
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {t.menu}
          </button>
          <div className="language-selector">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span className="lang-divider">/</span>
            <button
              className={`lang-btn ${language === 'es' ? 'active' : ''}`}
              onClick={() => setLanguage('es')}
            >
              ES
            </button>
          </div>
        </div>
      )}

      {(isMenuOpen || isClosing) && (
        <div className={`simple-menu-overlay ${isClosing ? 'closing' : ''}`} onClick={closeMenu}>
          <div className="simple-menu-content">
            <button className="simple-menu-close" onClick={closeMenu}>×</button>
            <div className="simple-menu-items">
              {!isHomePage && (
                <Link to="/" className="simple-menu-item" onClick={closeMenu}>
                  <span>{t.home}</span>
                </Link>
              )}
              <Link to="/content" className="simple-menu-item" onClick={closeMenu}>
                <span>{t.content}</span>
              </Link>
              <Link to="/actress" className="simple-menu-item" onClick={closeMenu}>
                <span>{t.actress}</span>
              </Link>
              <Link to="/contact" className="simple-menu-item" onClick={closeMenu}>
                <span>{t.contact}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar