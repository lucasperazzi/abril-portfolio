import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../LanguageContext'
import './Contact.css'

const ContactArrow = () => (
  <svg
    className="contact-link-row-arrow"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M4 14H23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    <path d="M16 7L23 14L16 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
)

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

  const contactItems = [
    {
      label: t.instagram,
      handle: '@biancoabril_',
      href: 'https://www.instagram.com/biancoabril_',
      external: true
    },
    {
      label: t.tiktok,
      handle: '@abrilbiancotav',
      href: 'https://www.tiktok.com/@abrilbiancotav',
      external: true
    },
    {
      label: t.linkedin,
      handle: 'Abril Bianco Tavagnacco',
      href: 'https://www.linkedin.com/in/abril-bianco-tavagnacco',
      external: true
    },
    {
      label: t.email,
      handle: 'abrilbiancotav@gmail.com',
      href: 'mailto:abrilbiancotav@gmail.com',
      external: false
    }
  ]

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

  const total = contactItems.length

  return (
    <div className="page-container contact-page">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
      </div>

      <div className="page-content">
        <div
          ref={contactCardsRef}
          className={`contact-info contact-info-animated ${areContactCardsVisible ? 'contact-info-visible' : ''}`}
        >
          {contactItems.map((item, index) => {
            const indexLabel = String(index + 1).padStart(2, '0')
            const totalLabel = String(total).padStart(2, '0')
            const externalProps = item.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <a
                key={item.label}
                href={item.href}
                {...externalProps}
                className="contact-link-row"
              >
                <span className="contact-link-row-index" aria-hidden="true">
                  {indexLabel}
                  <span className="contact-link-row-index-total">/{totalLabel}</span>
                </span>
                <span className="contact-link-row-label">{item.label}</span>
                <span className="contact-link-row-handle">{item.handle}</span>
                <ContactArrow />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Contact
