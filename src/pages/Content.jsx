import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../LanguageContext'
import './Content.css'

function ReelVideo({ src, onContextMenu }) {
  const videoRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play()
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {})
            }
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {!isLoaded && <div className="reel-card-skeleton" />}
      <video
        ref={videoRef}
        src={src}
        className="reel-card-media"
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        onContextMenu={onContextMenu}
      />
    </>
  )
}

function Content() {
  const { language } = useLanguage()
  const [selectedItem, setSelectedItem] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const [modalVideoLoaded, setModalVideoLoaded] = useState(false)

  const handleImageContextMenu = (e) => {
    e.preventDefault()
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedItem(null)
      setIsClosing(false)
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedItem) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedItem])

  useEffect(() => {
    if (selectedItem || isClosing) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedItem, isClosing])

  const translations = {
    en: {
      title: 'Content Creator',
      description: 'Creating compelling digital content that connects with audiences and tells meaningful stories across various platforms and mediums.',
      galleryTitle: 'Recent Projects',
      servicesTitle: 'What I can do for your brand',
      servicesSubtitle: 'And why your brand needs me on the team.',
      services: [
        {
          label: 'Network presence',
          description: 'Strategic visibility across Instagram, TikTok, and emerging platforms — keeping your brand where the right audience is paying attention.'
        },
        {
          label: 'Brand storytelling',
          description: 'Authentic narratives that turn passive viewers into a community that buys, shares, and stays.'
        },
        {
          label: 'Content creation',
          description: 'High-impact reels, photo campaigns, and editorial pieces produced end-to-end with a refined visual language.'
        },
        {
          label: 'Creative direction',
          description: 'Concept, styling, and visual identity for digital launches, lookbooks, and campaign rollouts.'
        },
        {
          label: 'Brand collaborations',
          description: 'Considered partnerships with brands whose values, aesthetic, and audience genuinely align with mine.'
        },
        {
          label: 'Analytics & strategy',
          description: 'Data-led planning that pairs creative instinct with measurable performance.'
        }
      ]
    },
    es: {
      title: 'Creadora de Contenido',
      description: 'Creando contenido digital convincente que conecta con las audiencias y cuenta historias significativas a través de varias plataformas y medios.',
      galleryTitle: 'Proyectos Recientes',
      servicesTitle: 'Qué puedo hacer para tu marca',
      servicesSubtitle: 'Y por qué tu marca me necesita en el equipo.',
      services: [
        {
          label: 'Presencia digital',
          description: 'Visibilidad estratégica en Instagram, TikTok y plataformas emergentes — manteniendo tu marca donde la audiencia correcta está prestando atención.'
        },
        {
          label: 'Narrativa de marca',
          description: 'Historias auténticas que transforman espectadores pasivos en una comunidad que compra, comparte y se queda.'
        },
        {
          label: 'Creación de contenido',
          description: 'Reels, campañas fotográficas y piezas editoriales de alto impacto producidos de principio a fin con un lenguaje visual refinado.'
        },
        {
          label: 'Dirección creativa',
          description: 'Concepto, estilismo e identidad visual para lanzamientos digitales, lookbooks y campañas.'
        },
        {
          label: 'Colaboraciones',
          description: 'Alianzas pensadas con marcas cuyos valores, estética y audiencia se alinean genuinamente con los míos.'
        },
        {
          label: 'Análisis y estrategia',
          description: 'Planificación basada en datos que combina instinto creativo con rendimiento medible.'
        }
      ]
    }
  }

  const t = translations[language]

  const items = [
    { id: 1, title: 'Santa Patrona', type: 'video', src: '/content-creator/SantaPatrona1.mp4' },
    { id: 2, title: 'Toia 1', type: 'video', src: '/content-creator/Toia1.mp4' },
    { id: 3, title: 'Agora', type: 'video', src: '/content-creator/Agora.mp4' },
    { id: 4, title: 'Toia 2', type: 'video', src: '/content-creator/Toia2.mp4' }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-description">{t.description}</p>
      </div>

      <div className="page-content">
        <h2 className="gallery-title">{t.galleryTitle}</h2>
        <div className="reel-gallery">
          {items.map((item) => (
            <div
              key={item.id}
              className="reel-card-wrapper"
              onClick={() => { setSelectedItem(item); setModalVideoLoaded(false) }}
            >
              <h3 className="reel-card-title">{item.title}</h3>
              <div className="reel-card">
                {item.type === 'video' ? (
                  <ReelVideo
                    src={item.src}
                    onContextMenu={handleImageContextMenu}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="reel-card-media"
                    onContextMenu={handleImageContextMenu}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="services-section">
        <div className="services-inner">
          <div className="services-header">
            <h2 className="services-title">{t.servicesTitle}</h2>
            <p className="services-subtitle">{t.servicesSubtitle}</p>
          </div>
          <ul className="services-list">
            {t.services.map((service) => (
              <li key={service.label} className="services-item">
                <span className="services-item-label">{service.label}</span>
                <span className="services-item-description">{service.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(selectedItem || isClosing) && (
        <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedItem.type === 'video' ? (
              <>
                {!modalVideoLoaded && <div className="modal-video-skeleton" />}
                <video
                  src={selectedItem.src}
                  className="modal-image"
                  controls
                  autoPlay
                  playsInline
                  onCanPlay={() => setModalVideoLoaded(true)}
                  onContextMenu={handleImageContextMenu}
                />
              </>
            ) : (
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="modal-image"
                onContextMenu={handleImageContextMenu}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Content