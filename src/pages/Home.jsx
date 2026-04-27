import { useLanguage } from '../LanguageContext'
import { Link } from 'react-router-dom'
import { FiInstagram, FiMail } from 'react-icons/fi'
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
      content: 'Content'
    },
    es: {
      name: 'Abril Bianco',
      tagline: 'Creadora de Contenido y Actriz',
      about: 'Sobre Mí',
      description: 'Apasionada por dar vida a los personajes a través de la actuación y crear contenido convincente. Dedicada al crecimiento continuo y la excelencia creativa en la industria del entretenimiento.',
      contact: 'Contacto',
      actress: 'Actriz',
      content: 'Contenido'
    }
  }

  const t = translations[language]

  return (
    <div className="portfolio">
      <header className="header">
        <h1 className="name">{t.name}</h1>
        <p className="tagline">{t.tagline}</p>
      </header>

      <main className="content">
        <section className="image-section">
          <div className="gallery">
            <img src="/Abril1.jpeg" alt="Abril Bianco 1" className="gallery-image" onContextMenu={handleImageContextMenu} />
            <img src="/Abril2.jpeg" alt="Abril Bianco 2" className="gallery-image" onContextMenu={handleImageContextMenu} />
            <img src="/Abril3.jpeg" alt="Abril Bianco 3" className="gallery-image desktop-only" onContextMenu={handleImageContextMenu} />
            <img src="/Abril4.jpeg" alt="Abril Bianco 4" className="gallery-image desktop-only" onContextMenu={handleImageContextMenu} />
            <img src="/Abril5.jpeg" alt="Abril Bianco 5" className="gallery-image desktop-only" onContextMenu={handleImageContextMenu} />
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">{t.about}</h2>
          <p className="description">{t.description}</p>
        </section>

        <section className="social-links">
          <a href="https://www.instagram.com/biancoabril_" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FiInstagram />
          </a>
          <a href="https://www.tiktok.com/@abrilbiancotav" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" className="tiktok-icon">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
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