import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../LanguageContext'
import FakeVideoHero from '../components/FakeVideoHero'
import '../App.css'

function Home() {
  const { language } = useLanguage()
  const [isAboutImagesVisible, setIsAboutImagesVisible] = useState(false)
  const aboutImagesRef = useRef(null)

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

  const contactLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/biancoabril_' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@abrilbiancotav' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abril-bianco-tavagnacco' },
    { label: 'Email', href: 'mailto:abrilbiancotav@gmail.com' }
  ]

  const t = translations[language]

  useEffect(() => {
    const aboutImages = aboutImagesRef.current
    if (!aboutImages) return

    if (!('IntersectionObserver' in window)) {
      setIsAboutImagesVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutImagesVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(aboutImages)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="portfolio">
      {/* Main hero with role selector */}
      <FakeVideoHero />

      {/* About section with images */}
      <section className="about-section-with-images">
        <h2 className="section-title">{t.about}</h2>
        <p className="description">{t.description}</p>
        <div className="about-images">
          <img src="/home/Abril2.jpeg" alt="Abril Bianco" className="about-image about-image-large" loading="lazy" decoding="async" onContextMenu={handleImageContextMenu} />
          <img src="/home/Abril3.jpeg" alt="Abril Bianco" className="about-image about-image-small" loading="lazy" decoding="async" onContextMenu={handleImageContextMenu} />
          <img src="/home/Abril4.jpeg" alt="Abril Bianco" className="about-image about-image-medium" loading="lazy" decoding="async" onContextMenu={handleImageContextMenu} />
          <img src="/home/Abril1.jpeg" alt="Abril Bianco" className="about-image about-image-small desktop-only" loading="lazy" decoding="async" onContextMenu={handleImageContextMenu} />
          <img src="/home/Abril5.jpeg" alt="Abril Bianco" className="about-image about-image-medium desktop-only" loading="lazy" decoding="async" onContextMenu={handleImageContextMenu} />
          <img src="/home/Abril2.jpeg" alt="Abril Bianco" className="about-image about-image-small desktop-only" loading="lazy" decoding="async" onContextMenu={handleImageContextMenu} />
        </div>
      </section>

      {/* Contact section */}
      <section className="contact-section">
        <span className="contact-divider" aria-hidden="true" />
        <div className="contact-row">
          <h2 className="contact-heading">
            <span>{t.letsWork}</span>
          </h2>
          <ul className="contact-list">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 Abril. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home