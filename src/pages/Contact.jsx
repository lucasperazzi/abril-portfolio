import { useLanguage } from '../LanguageContext'
import './Contact.css'

function Contact() {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'Contact',
      description: 'Get in touch for collaborations, projects, or inquiries.',
      email: 'Email',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      location: 'Location'
    },
    es: {
      title: 'Contacto',
      description: 'Ponte en contacto para colaboraciones, proyectos o consultas.',
      email: 'Correo',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      location: 'Ubicación'
    }
  }

  const t = translations[language]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-description">{t.description}</p>
      </div>

      <div className="page-content">
        <div className="contact-info">
          <div className="contact-item">
            <h3>{t.email}</h3>
            <a href="mailto:contact@abrilbianco.com" className="contact-link">contact@abrilbianco.com</a>
          </div>
          <div className="contact-item">
            <h3>{t.instagram}</h3>
            <a href="https://www.instagram.com/biancoabril_" target="_blank" rel="noopener noreferrer" className="contact-link">@biancoabril_</a>
          </div>
          <div className="contact-item">
            <h3>{t.tiktok}</h3>
            <a href="https://www.tiktok.com/@abrilbiancotav" target="_blank" rel="noopener noreferrer" className="contact-link">@abrilbiancotav</a>
          </div>
          <div className="contact-item">
            <h3>{t.location}</h3>
            <p>Available upon request</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact