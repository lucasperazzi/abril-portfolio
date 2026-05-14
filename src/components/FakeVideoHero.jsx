import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../LanguageContext'
import { useNavigate } from 'react-router-dom'
import ReelModal from './ReelModal'

function FakeVideoHero({ isReelSection = false }) {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [pressedRole, setPressedRole] = useState(null)
  const pressedResetTimeoutRef = useRef(null)
  const navigationTimeoutRef = useRef(null)

  const translations = {
    en: {
      tagline: 'Actress & Content Creator',
      quote: 'Intense characters, real stories',
      watchReel: 'Watch reel',
      actress: 'Actress',
      creator: 'Content Creator',
      actressDesc: 'Showreel & acting work',
      creatorDesc: 'Content & collaborations',
      scrollToAbout: 'About me'
    },
    es: {
      tagline: 'Actriz & Creadora de contenido',
      quote: 'Personajes intensos, historias reales',
      watchReel: 'Ver reel',
      actress: 'Actriz',
      creator: 'Creadora de contenido',
      actressDesc: 'Showreel y trabajos actorales',
      creatorDesc: 'Contenido y colaboraciones',
      scrollToAbout: 'Sobre mí'
    }
  }

  const t = translations[language]

  const handleImageContextMenu = (e) => {
    e.preventDefault()
  }

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('.about-section-with-images')
    if (aboutSection) {
      const navbarHeight = window.innerWidth >= 769 ? 64 : 56
      const elementPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const clearRoleTimeouts = () => {
    if (pressedResetTimeoutRef.current) {
      window.clearTimeout(pressedResetTimeoutRef.current)
    }
    if (navigationTimeoutRef.current) {
      window.clearTimeout(navigationTimeoutRef.current)
    }
  }

  const handleRoleClick = (path, role) => {
    if (window.innerWidth > 768) {
      navigate(path)
      return
    }

    clearRoleTimeouts()
    setPressedRole(role)
    pressedResetTimeoutRef.current = window.setTimeout(() => {
      setPressedRole(null)
    }, 140)
    navigationTimeoutRef.current = window.setTimeout(() => {
      navigate(path)
    }, 180)
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

  useEffect(() => {
    return () => {
      clearRoleTimeouts()
    }
  }, [])

  useEffect(() => {
    const resetPressedRole = () => setPressedRole(null)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        resetPressedRole()
      }
    }

    window.addEventListener('pageshow', resetPressedRole)
    window.addEventListener('popstate', resetPressedRole)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      window.removeEventListener('pageshow', resetPressedRole)
      window.removeEventListener('popstate', resetPressedRole)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <section className="fake-video-hero">
      {/* Background image */}
      <picture className="hero-background-picture hero-background-desktop">
        <source srcSet="/home/Firefly.webp" type="image/webp" />
        <img
          src="/home/Firefly.png"
          alt="Abril Bianco"
          className="hero-background"
          fetchpriority="high"
          decoding="async"
          onContextMenu={handleImageContextMenu}
        />
      </picture>
      <picture className="hero-background-picture hero-background-mobile">
        <source srcSet="/home/backgroundmobile.webp" type="image/webp" />
        <img
          src="/home/backgroundmobile.png"
          alt="Abril Bianco"
          className="hero-background"
          fetchpriority="high"
          decoding="async"
          onContextMenu={handleImageContextMenu}
        />
      </picture>

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">Abril Bianco</h1>
        <p className="hero-tagline">{t.tagline}</p>

        {!isReelSection ? (
          // Role selector buttons (main hero)
          <div className="role-selector">
            <button
              onClick={() => handleRoleClick('/actress', 'actress')}
              className={`role-button ${pressedRole === 'actress' ? 'role-button-pressed' : ''}`}
            >
              <span className="role-title">{t.actress}</span>
              <span className="role-desc">{t.actressDesc}</span>
            </button>
            <button
              onClick={() => handleRoleClick('/content', 'content')}
              className={`role-button ${pressedRole === 'content' ? 'role-button-pressed' : ''}`}
            >
              <span className="role-title">{t.creator}</span>
              <span className="role-desc">{t.creatorDesc}</span>
            </button>
          </div>
        ) : (
          // Reel button (actriz section)
          <button
            className="hero-button"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="play-icon">▶</span>
            <span>{t.watchReel}</span>
          </button>
        )}
      </div>

      {/* Scroll down indicator - only on main hero */}
      {!isReelSection && (
        <button
          className={`scroll-down-indicator ${!showScrollIndicator ? 'hidden' : ''}`}
          onClick={handleScrollDown}
          aria-label={t.scrollToAbout}
        >
          <span className="scroll-label">{t.scrollToAbout}</span>
          <span className="scroll-arrow">↓</span>
        </button>
      )}

      {/* FUTURE: replace Image with <video> */}

      <ReelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc="/actress/reel_converted.mp4"
      />
    </section>
  )
}

export default FakeVideoHero