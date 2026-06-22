import { useEffect } from 'react'
import { useLanguage } from '../LanguageContext'
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

  const contactLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/biancoabril_' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@abrilbiancotav' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abril-bianco-tavagnacco' },
    { label: 'Email', href: 'mailto:abrilbiancotav@gmail.com' }
  ]

  const t = translations[language]

  return (
    <div className="portfolio">
      {/* Main hero with role selector (pinned behind the content) */}
      <FakeVideoHero />

      {/* Everything below slides up over the pinned hero like a curtain */}
      <div className="home-reveal">
        {/* About section with images */}
        <section className="about-section-with-images">
          <h2 className="section-title">{t.about}</h2>
          <p className="description">{t.description}</p>
          <div className="about-images">
            {/* Slots 1-3: always visible */}
            <img src="/home/Abril2.jpeg" alt="Abril Bianco" className="about-image about-image--1" loading="lazy" decoding="async" style={{ transitionDelay: '0s' }} onContextMenu={handleImageContextMenu} />
            <img src="/home/Abril3.jpeg" alt="Abril Bianco" className="about-image about-image--2" loading="lazy" decoding="async" style={{ transitionDelay: '0.06s' }} onContextMenu={handleImageContextMenu} />
            <img src="/home/Abril4.jpeg" alt="Abril Bianco" className="about-image about-image--3" loading="lazy" decoding="async" style={{ transitionDelay: '0.12s' }} onContextMenu={handleImageContextMenu} />
            {/* Slots 4-5: mobile-only (adds 2 more images on mobile) */}
            <img src="/home/Abril1.jpeg" alt="Abril Bianco" className="about-image about-image--4 mobile-only" loading="lazy" decoding="async" style={{ transitionDelay: '0.18s' }} onContextMenu={handleImageContextMenu} />
            <img src="/home/Abril5.jpeg" alt="Abril Bianco" className="about-image about-image--5 mobile-only" loading="lazy" decoding="async" style={{ transitionDelay: '0.24s' }} onContextMenu={handleImageContextMenu} />
            {/* Slots 6-8: desktop-only */}
            <img src="/home/Abril1.jpeg" alt="Abril Bianco" className="about-image about-image--6 desktop-only" loading="lazy" decoding="async" style={{ transitionDelay: '0.18s' }} onContextMenu={handleImageContextMenu} />
            <img src="/home/Abril5.jpeg" alt="Abril Bianco" className="about-image about-image--7 desktop-only" loading="lazy" decoding="async" style={{ transitionDelay: '0.24s' }} onContextMenu={handleImageContextMenu} />
            <img src="/home/Abril2.jpeg" alt="Abril Bianco" className="about-image about-image--8 desktop-only" loading="lazy" decoding="async" style={{ transitionDelay: '0.30s' }} onContextMenu={handleImageContextMenu} />
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
    </div>
  )
}

export default Home