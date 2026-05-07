import { useLanguage } from '../LanguageContext'
import { Link } from 'react-router-dom'
import { FiInstagram, FiMail, FiLinkedin } from 'react-icons/fi'
import FakeVideoHero from '../components/FakeVideoHero'
import '../App.css'

function Home() {
  const { language } = useLanguage()

  const handleImageContextMenu = (e) => {
    e.preventDefault()
  }

  const translations = {
    en: {
      name: 'Abril Bianco',
      tagline: 'Content Creator and Actress',
      about: 'About Me',
      description: 'Passionate about bringing characters to life through acting and creating compelling content. Dedicated to continuous growth and creative excellence in the entertainment industry.',
      contact: 'Contact',
      actress: 'Actress',
      content: 'Content',
      letsWork: "Let's work together"
    },
    es: {
      name: 'Abril Bianco',
      tagline: 'Creadora de Contenido y Actriz',
      about: 'Sobre Mí',
      description: 'Apasionada por dar vida a los personajes a través de la actuación y crear contenido convincente. Dedicada al crecimiento continuo y la excelencia creativa en la industria del entretenimiento.',
      contact: 'Contacto',
      actress: 'Actriz',
      content: 'Contenido',
      letsWork: 'Trabajemos juntos'
    }
  }

  const t = translations[language]

  return (
    <div className="portfolio">
      {/* Main hero with role selector */}
      <FakeVideoHero />

      {/* About section with images */}
      <section className="about-section-with-images">
        <h2 className="section-title">{t.about}</h2>
        <p className="description">{t.description}</p>
        <div className="about-images">
          <img src="/Abril2.jpeg" alt="Abril Bianco" className="about-image about-image-large" onContextMenu={handleImageContextMenu} />
          <img src="/Abril3.jpeg" alt="Abril Bianco" className="about-image about-image-small" onContextMenu={handleImageContextMenu} />
          <img src="/Abril4.jpeg" alt="Abril Bianco" className="about-image about-image-medium" onContextMenu={handleImageContextMenu} />
          <img src="/Abril1.jpeg" alt="Abril Bianco" className="about-image about-image-small desktop-only" onContextMenu={handleImageContextMenu} />
          <img src="/Abril5.jpeg" alt="Abril Bianco" className="about-image about-image-medium desktop-only" onContextMenu={handleImageContextMenu} />
          <img src="/Abril2.jpeg" alt="Abril Bianco" className="about-image about-image-small desktop-only" onContextMenu={handleImageContextMenu} />
        </div>
      </section>

      {/* Keep existing sections below */}
      <main className="content">
        <h2 className="social-heading">{t.letsWork}</h2>
        <section className="social-links">
          <a href="https://www.instagram.com/biancoabril_" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FiInstagram />
          </a>
          <a href="https://www.tiktok.com/@abrilbiancotav" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" className="tiktok-icon">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/abril-bianco-tavagnacco" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FiLinkedin />
          </a>
          <a href="mailto:abrilbiancotav@gmail.com" className="social-icon">
            <FiMail />
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Abril. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home