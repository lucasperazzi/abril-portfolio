import { useLanguage } from '../LanguageContext'
import { Link } from 'react-router-dom'
import '../App.css'

function Home() {
  const { language, setLanguage } = useLanguage()

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
        <div className="header-language-selector">
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
        <h1 className="name">{t.name}</h1>
        <p className="tagline">{t.tagline}</p>
      </header>

      <main className="content">
        <section className="image-section">
          <div className="gallery">
            <img src="/Abril1.jpeg" alt="Abril Bianco 1" className="gallery-image" />
            <img src="/Abril2.jpeg" alt="Abril Bianco 2" className="gallery-image" />
            <img src="/Abril3.jpeg" alt="Abril Bianco 3" className="gallery-image desktop-only" />
            <img src="/Abril4.jpeg" alt="Abril Bianco 4" className="gallery-image desktop-only" />
            <img src="/Abril5.jpeg" alt="Abril Bianco 5" className="gallery-image desktop-only" />
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">{t.about}</h2>
          <p className="description">{t.description}</p>
        </section>

        <nav className="bottom-nav">
          <Link to="/contact" className="nav-link">{t.contact}</Link>
          <Link to="/actress" className="nav-link">{t.actress}</Link>
          <Link to="/content" className="nav-link">{t.content}</Link>
        </nav>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Abril. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home