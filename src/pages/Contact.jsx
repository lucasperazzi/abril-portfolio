import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../LanguageContext'
import './Contact.css'

function Contact() {
  const { language } = useLanguage()
  const [areContactCardsVisible, setAreContactCardsVisible] = useState(false)
  const contactCardsRef = useRef(null)

  const translations = {
    en: {
      title: "Let's work together",
      email: 'Email',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      linkedin: 'LinkedIn'
    },
    es: {
      title: 'Trabajemos juntos',
      email: 'Correo',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      linkedin: 'LinkedIn'
    }
  }

  const t = translations[language]

  useEffect(() => {
    const contactCards = contactCardsRef.current
    if (!contactCards) return

    if (!('IntersectionObserver' in window)) {
      setAreContactCardsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreContactCardsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(contactCards)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-container contact-page">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
      </div>

      <div className="page-content">
        <div ref={contactCardsRef} className={`contact-info contact-info-animated ${areContactCardsVisible ? 'contact-info-visible' : ''}`}>
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