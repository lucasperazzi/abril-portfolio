import { useLanguage } from '../LanguageContext'

function PortfolioGrid() {
  const { language } = useLanguage()

  const translations = {
    en: {
      portfolio: 'Portfolio'
    },
    es: {
      portfolio: 'Portfolio'
    }
  }

  const t = translations[language]

  const images = [
    "/home/Abril2.jpeg",
    "/home/Abril3.jpeg",
    "/home/Abril4.jpeg",
    "/home/Abril5.jpeg",
    "/home/Abril1.jpeg",
  ]

  const handleImageContextMenu = (e) => {
    e.preventDefault()
  }

  return (
    <section className="portfolio-grid-section">
      <h2 className="portfolio-title">{t.portfolio}</h2>
      
      <div className="portfolio-grid">
        {/* Big image */}
        <div className="grid-item big">
          <img 
            src={images[0]} 
            alt="" 
            className="grid-image"
            onContextMenu={handleImageContextMenu}
          />
        </div>

        {/* Small images */}
        {images.slice(1).map((src, i) => (
          <div key={i} className="grid-item small">
            <img 
              src={src} 
              alt="" 
              className="grid-image"
              onContextMenu={handleImageContextMenu}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default PortfolioGrid