import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiChevronDown, FiGlobe } from 'react-icons/fi'
import { useLanguage } from './LanguageContext'
import './Navbar.css'

function LanguageSelector({ isScrolled = false }) {
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
    <div className={`language-selector ${isOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`} ref={selectorRef}>
      <button
        className={`language-toggle ${isScrolled ? 'scrolled' : ''}`}
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
  const [activePath, setActivePath] = useState(location.pathname)
  const [isScrolled, setIsScrolled] = useState(!isHomePage)
  const isMenuActive = isMenuOpen || isClosing

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true)
    } else {
      const aboutSection = document.querySelector('.about-section-with-images')
      if (aboutSection) {
        const aboutSectionTop = aboutSection.getBoundingClientRect().top + window.pageYOffset
        setIsScrolled(window.scrollY > aboutSectionTop)
      } else {
        setIsScrolled(window.scrollY > 50)
      }
    }
  }, [isHomePage])

  useEffect(() => {
    setActivePath(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      const aboutSection = document.querySelector('.about-section-with-images')
      if (aboutSection) {
        const aboutSectionTop = aboutSection.getBoundingClientRect().top + window.pageYOffset
        setIsScrolled(window.scrollY >= aboutSectionTop)
      } else {
        setIsScrolled(window.scrollY > 50)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    // Use IntersectionObserver to detect when about section is visible
    const aboutSection = document.querySelector('.about-section-with-images')
    if (aboutSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsScrolled(!entry.isIntersecting)
        },
        { threshold: 0, rootMargin: '0px 0px 0px 0px' } // Trigger when section is at top
      )
      observer.observe(aboutSection)
      return () => {
        window.removeEventListener('scroll', handleScroll)
        observer.disconnect()
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage])

  useEffect(() => {
    if (!isMenuActive) {
      return
    }

    // Only block body scroll on mobile/tablet
    const isMobile = window.innerWidth <= 768
    if (!isMobile) {
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
    className: `simple-menu-item ${activePath === path ? 'active' : ''}`,
    'aria-current': activePath === path ? 'page' : undefined
  })

  const handleLogoClick = (e) => {
    if (isHomePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleMenuItemClick = (path) => {
    setIsMenuOpen(false)
    setIsClosing(false)
    setActivePath(path)
  }

  return (
    <>
      <nav className={`top-nav ${isVisible ? 'visible' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          {(!isHomePage || isScrolled) && (
            <Link to="/" className="nav-logo" onClick={handleLogoClick}>Abril Bianco</Link>
          )}
        </div>
        <div className="nav-right">
          <LanguageSelector isScrolled={isScrolled} />
          <div className="burger-button-placeholder"></div>
        </div>
      </nav>

      {/* Always visible language selector for main page */}
      {isMounted && (
        <div className={`floating-nav ${isVisible ? 'hide' : 'show'} ${isScrolled ? 'scrolled' : ''}`}>
          <LanguageSelector isScrolled={isScrolled} />
          <div className="burger-button-placeholder"></div>
        </div>
      )}

      {/* Standalone burger button at top level for proper stacking */}
      {isMounted && (
        <button
          className={`burger-button ${isMenuOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : t.menu}
          aria-expanded={isMenuOpen}
        >
          <span className="burger-line burger-line-1"></span>
          <span className="burger-line burger-line-2"></span>
          <span className="burger-line burger-line-3"></span>
        </button>
      )}

      {(isMenuOpen || isClosing) && (
        <div className={`simple-menu-overlay ${isClosing ? 'closing' : ''}`} onClick={closeMenu} role="dialog" aria-modal="true" aria-label={t.menu}>
          <div className="simple-menu-content">
            <div className="simple-menu-items">
              {!isHomePage && (
                <Link to="/" {...getMenuItemProps('/')} onClick={() => handleMenuItemClick('/')}>
                  <span>{t.home}</span>
                </Link>
              )}
              <Link to="/content" {...getMenuItemProps('/content')} onClick={() => handleMenuItemClick('/content')}>
                <span>{t.content}</span>
              </Link>
              <Link to="/actress" {...getMenuItemProps('/actress')} onClick={() => handleMenuItemClick('/actress')}>
                <span>{t.actress}</span>
              </Link>
              <Link to="/contact" {...getMenuItemProps('/contact')} onClick={() => handleMenuItemClick('/contact')}>
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