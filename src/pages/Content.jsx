import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../LanguageContext'
import LazyPreviewVideo from '../components/LazyPreviewVideo'
import { useResponsiveVideoSrc } from '../hooks/useResponsiveVideoSrc'
import './Content.css'

const contentItems = [
  {
    id: 1,
    title: 'Agora',
    type: 'video',
    src: '/content-creator/Agora.mp4',
    mobileSrc: '/content-creator/Agora-mobile.mp4',
    previewSrc: '/content-creator/Agora-preview.mp4',
    poster: '/content-creator/Agora-poster.jpg'
  },
  {
    id: 2,
    title: 'Santa Patrona',
    type: 'video',
    src: '/content-creator/SantaPatrona1.mp4',
    previewSrc: '/content-creator/SantaPatrona1-preview.mp4',
    poster: '/content-creator/SantaPatrona1-poster.jpg'
  },
  {
    id: 3,
    title: 'Toia de Kiev',
    type: 'video',
    src: '/content-creator/Toia1.mp4',
    previewSrc: '/content-creator/Toia1-preview.mp4',
    poster: '/content-creator/Toia1-poster.jpg'
  },
  {
    id: 4,
    title: 'Agora',
    type: 'video',
    src: '/content-creator/Agora2.mp4',
    mobileSrc: '/content-creator/Agora2-mobile.mp4',
    previewSrc: '/content-creator/Agora2-preview.mp4',
    poster: '/content-creator/Agora2-poster.jpg'
  },
  {
    id: 5,
    title: 'Maika Spa',
    type: 'video',
    src: '/content-creator/MaikaSpa.mp4',
    previewSrc: '/content-creator/MaikaSpa-preview.mp4',
    poster: '/content-creator/MaikaSpa-poster.jpg'
  },
  {
    id: 6,
    title: 'Santa Patrona',
    type: 'video',
    src: '/content-creator/SantaPatrona2.mp4',
    previewSrc: '/content-creator/SantaPatrona2-preview.mp4',
    poster: '/content-creator/SantaPatrona2-poster.jpg'
  },
  {
    id: 7,
    title: 'Toia de Kiev',
    type: 'video',
    src: '/content-creator/Toia2.mp4',
    previewSrc: '/content-creator/Toia2-preview.mp4',
    poster: '/content-creator/Toia2-poster.jpg'
  },
  {
    id: 8,
    title: 'Toia de Kiev',
    type: 'video',
    src: '/content-creator/Toia3.mp4',
    previewSrc: '/content-creator/Toia3-preview.mp4',
    poster: '/content-creator/Toia3-poster.jpg'
  }
]

function Content() {
  const { language } = useLanguage()
  const [selectedItem, setSelectedItem] = useState(null)
  const [isClosing, setIsClosing] = useState(false)
  const [modalVideoLoaded, setModalVideoLoaded] = useState(false)
  const [areReelCardsVisible, setAreReelCardsVisible] = useState(false)
  const [areServicesVisible, setAreServicesVisible] = useState(false)
  const servicesListRef = useRef(null)
  const selectedVideoSrc = useResponsiveVideoSrc(selectedItem?.src, selectedItem?.mobileSrc)

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

  useEffect(() => {
    setModalVideoLoaded(false)
  }, [selectedVideoSrc])

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setAreReelCardsVisible(true)
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [])

  useEffect(() => {
    const servicesList = servicesListRef.current
    if (!servicesList) return

    if (!('IntersectionObserver' in window)) {
      setAreServicesVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreServicesVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.04, rootMargin: '0px 0px 18% 0px' }
    )

    observer.observe(servicesList)
    return () => observer.disconnect()
  }, [])

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

  return (
    <div className="page-container content-page">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-description">{t.description}</p>
      </div>

      <div className="page-content">
        <h2 className="gallery-title">{t.galleryTitle}</h2>
        <div className={`reel-gallery reel-gallery-animated ${areReelCardsVisible ? 'reel-gallery-visible' : ''}`}>
          {contentItems.map((item) => (
            <div
              key={item.id}
              className="reel-card-wrapper"
              onClick={() => { setSelectedItem(item); setModalVideoLoaded(false) }}
            >
              <h3 className="reel-card-title">{item.title}</h3>
              <div className="reel-card">
                {item.type === 'video' ? (
                  <LazyPreviewVideo
                    src={item.previewSrc || item.src}
                    poster={item.poster}
                    className="reel-card-media"
                    skeletonClassName="reel-card-skeleton"
                    onContextMenu={handleImageContextMenu}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="reel-card-media"
                    loading="lazy"
                    decoding="async"
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
          <ul ref={servicesListRef} className={`services-list services-list-animated ${areServicesVisible ? 'services-list-visible' : ''}`}>
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
                {!modalVideoLoaded && !selectedItem.poster && <div className="modal-video-skeleton" />}
                <video
                  key={selectedVideoSrc}
                  src={selectedVideoSrc}
                  className="modal-image"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={selectedItem.poster}
                  onLoadedData={() => setModalVideoLoaded(true)}
                  onCanPlay={() => setModalVideoLoaded(true)}
                  onContextMenu={handleImageContextMenu}
                />
              </>
            ) : (
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="modal-image"
                decoding="async"
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