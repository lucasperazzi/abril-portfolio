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
  const navigationTimeoutRef = useRef(null)

  const translations = {
    en: {
      tagline: 'Actress & Content Creator',
      quote: 'Intense characters, real stories',
      watchReel: 'Watch reel',
      actress: 'Actress',
      creator: 'Content Creator',
      actressDesc: 'Showreel & acting work',
      creatorDesc: 'Content & collaborations'
    },
    es: {
      tagline: 'Actriz & Creadora de contenido',
      quote: 'Personajes intensos, historias reales',
      watchReel: 'Ver reel',
      actress: 'Actriz',
      creator: 'Creadora de contenido',
      actressDesc: 'Showreel y trabajos actorales',
      creatorDesc: 'Contenido y colaboraciones'
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

  const handleRoleClick = (path, role) => {
    if (window.innerWidth <= 768) {
      setPressedRole(role)
      navigationTimeoutRef.current = window.setTimeout(() => {
        navigate(path)
      }, 160)
    } else {
      navigate(path)
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

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        window.clearTimeout(navigationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="fake-video-hero">
      {/* Background image */}
      <img
        src="/home/Firefly.png"
        alt="Abril Bianco"
        className="hero-background hero-background-desktop"
        onContextMenu={handleImageContextMenu}
      />
      <img
        src="/home/backgroundmobile.png"
        alt="Abril Bianco"
        className="hero-background hero-background-mobile"
        onContextMenu={handleImageContextMenu}
      />

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
          aria-label="Scroll down"
        >
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