import { useEffect } from 'react'
import { useLanguage } from '../LanguageContext'
import FakeVideoHero from '../components/FakeVideoHero'
import '../App.css'

function Home() {
  const { language } = useLanguage()
  const handleImageContextMenu = (e) => {
    e.preventDefault()
  }

  const highlightBuenosAires = (text) => {
    const parts = text.split('Buenos Aires')
    if (parts.length === 1) return text
    return parts.flatMap((part, i) =>
      i < parts.length - 1
        ? [part, <span key={i} className="highlight-pink">Buenos Aires</span>]
        : [part]
    )
  }

  const translations = {
    en: {
      name: 'Abril Bianco',
      tagline: 'Content Creator and Actress',
      about: 'About Me',
      paragraphs: [
        "Actress and content creator, with experience in creative direction and project management for brands.",
        "For over 4 years I've worked in digital marketing, while pursuing my other great passion: acting, between theatre and advertising. Two paths I learned to make coexist — and that today strengthen each other.",
        "I studied acting and marketing, and that combination is what sets me apart: I approach every project with a strategic eye and execute it with creative sensitivity.",
        "Based in Buenos Aires, working with brands that seek content with identity, strategy, and results."
      ],
      contact: 'Contact',
      actress: 'Actress',
      content: 'Content',
      letsWork: "Let's work together"
    },
    es: {
      name: 'Abril Bianco',
      tagline: 'Creadora de Contenido y Actriz',
      about: 'Sobre Mí',
      paragraphs: [
        'Soy actriz y creadora de contenido, con experiencia en dirección creativa y project management de distintos equipos para marcas.',
        'Hace más de 4 años trabajo en el mundo del marketing digital, y en paralelo persigo y trabajo de mi otro gran sueño: la actuación, entre teatro y publicidad. Dos caminos que aprendí a hacer convivir, y que hoy se potencian entre sí.',
        'Estudié actuación y marketing, y esa combinación es lo que me distingue: pienso cada proyecto con ojo estratégico y lo ejecuto con sensibilidad creativa.',
        'Vivo en Buenos Aires y trabajo con marcas que buscan contenido con identidad, estrategia y resultado.'
      ],
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
          <div className="description">
            {t.paragraphs.map((para, i) => (
              <p key={i} className="description-para">{highlightBuenosAires(para)}</p>
            ))}
          </div>
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