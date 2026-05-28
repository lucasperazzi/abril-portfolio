import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import './Navbar.css'

function Navbar({ isVisible = true, isHomePage = false }) {
  const { language, setLanguage } = useLanguage()
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
          <div className="burger-button-placeholder"></div>
        </div>
      </nav>

      {/* Always visible language selector for main page */}
      {isMounted && (
        <div className={`floating-nav ${isVisible ? 'hide' : 'show'} ${isScrolled ? 'scrolled' : ''}`}>
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
            <button
              type="button"
              className="menu-language-toggle"
              onClick={(e) => {
                e.stopPropagation()
                setLanguage(language === 'es' ? 'en' : 'es')
              }}
            >
              {language === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar