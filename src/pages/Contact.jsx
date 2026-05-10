import { useLanguage } from '../LanguageContext'
import './Contact.css'

function Contact() {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'Trabajemos juntos',
      description: 'Get in touch for collaborations, projects, or inquiries.',
      email: 'Email',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      linkedin: 'LinkedIn'
    },
    es: {
      title: 'Trabajemos juntos',
      description: 'Ponte en contacto para colaboraciones, proyectos o consultas.',
      email: 'Correo',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      linkedin: 'LinkedIn'
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
          <a href="https://www.instagram.com/biancoabril_" target="_blank" rel="noopener noreferrer" className="contact-item">
            <h3>{t.instagram}</h3>
            <p>@biancoabril_</p>
          </a>
          <a href="https://www.tiktok.com/@abrilbiancotav" target="_blank" rel="noopener noreferrer" className="contact-item">
            <h3>{t.tiktok}</h3>
            <p>@abrilbiancotav</p>
          </a>
          <a href="https://www.linkedin.com/in/abril-bianco-tavagnacco" target="_blank" rel="noopener noreferrer" className="contact-item">
            <h3>{t.linkedin}</h3>
            <p>Abril Bianco Tavagnacco</p>
          </a>
          <a href="mailto:abrilbiancotav@gmail.com" className="contact-item">
            <h3>{t.email}</h3>
            <p>abrilbiancotav@gmail.com</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact