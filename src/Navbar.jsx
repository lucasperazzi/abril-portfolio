import { Link } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import './Navbar.css'

function Navbar({ isVisible = true }) {
  const { language, setLanguage } = useLanguage()

  const translations = {
    en: {
      contact: 'Contact',
      actress: 'Actress',
      content: 'Content'
    },
    es: {
      contact: 'Contacto',
      actress: 'Actriz',
      content: 'Contenido'
    }
  }

  const t = translations[language]

  return (
    <nav className={`top-nav ${isVisible ? 'visible' : ''}`}>
      <div className="nav-content">
        <Link to="/" className="nav-logo">Abril Bianco</Link>
        <div className="nav-right">
          <div className="nav-links">
            <Link to="/content" className="nav-link">{t.content}</Link>
            <Link to="/actress" className="nav-link">{t.actress}</Link>
            <Link to="/contact" className="nav-link">{t.contact}</Link>
          </div>
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
  )
}

export default Navbar