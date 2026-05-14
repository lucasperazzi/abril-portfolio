import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiChevronDown, FiGlobe, FiMenu } from 'react-icons/fi'
import { useLanguage } from './LanguageContext'
import './Navbar.css'

function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef(null)
  const languages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectLanguage = (code) => {
    setLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className={`language-selector ${isOpen ? 'open' : ''}`} ref={selectorRef}>
      <button
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <FiGlobe className="language-icon" />
        <span>{language.toUpperCase()}</span>
        <FiChevronDown className="language-chevron" />
      </button>
      {isOpen && (
        <div className="language-menu" role="listbox">
          {languages.map((item) => (
            <button
              key={item.code}
              className={`language-option ${language === item.code ? 'active' : ''}`}
              onClick={() => selectLanguage(item.code)}
              role="option"
              aria-selected={language === item.code}
            >
              <span className="language-option-code">{item.code.toUpperCase()}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Navbar({ isVisible = true, isHomePage = false }) {
  const { language } = useLanguage()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const isMenuActive = isMenuOpen || isClosing

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMenuActive) {
      return
    }

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const currentPaddingRight = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
    }
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isMenuActive])

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
  const getMenuItemProps = (path) => ({
    className: `simple-menu-item ${location.pathname === path ? 'active' : ''}`,
    'aria-current': location.pathname === path ? 'page' : undefined
  })

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
              aria-label={t.menu}
              aria-expanded={isMenuOpen}
            >
              <FiMenu className="menu-icon" aria-hidden="true" />
            </button>
            <LanguageSelector />
          </div>
        </div>
      </nav>

      {/* Always visible menu button and language selector for main page */}
      {isMounted && (
        <div className={`floating-nav ${isVisible ? 'hide' : 'show'}`}>
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t.menu}
            aria-expanded={isMenuOpen}
          >
            <FiMenu className="menu-icon" aria-hidden="true" />
          </button>
          <LanguageSelector />
        </div>
      )}

      {(isMenuOpen || isClosing) && (
        <div className={`simple-menu-overlay ${isClosing ? 'closing' : ''}`} onClick={closeMenu} role="dialog" aria-modal="true" aria-label={t.menu}>
          <div className="simple-menu-content">
            <button className="simple-menu-close" onClick={closeMenu} aria-label={t.menu}>×</button>
            <div className="simple-menu-items">
              {!isHomePage && (
                <Link to="/" {...getMenuItemProps('/')} onClick={closeMenu}>
                  <span>{t.home}</span>
                </Link>
              )}
              <Link to="/content" {...getMenuItemProps('/content')} onClick={closeMenu}>
                <span>{t.content}</span>
              </Link>
              <Link to="/actress" {...getMenuItemProps('/actress')} onClick={closeMenu}>
                <span>{t.actress}</span>
              </Link>
              <Link to="/contact" {...getMenuItemProps('/contact')} onClick={closeMenu}>
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