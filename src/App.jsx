import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './pages/Home'
import Content from './pages/Content'
import Actress from './pages/Actress'
import Contact from './pages/Contact'
import { useLanguage } from './LanguageContext'
import './App.css'

const pageMeta = {
  '/': {
    title: 'Abril Bianco | Portfolio',
    description: 'Portfolio oficial de Abril Bianco: actuación, contenido, colaboraciones y contacto.'
  },
  '/content': {
    title: 'Content Creator | Abril Bianco',
    description: 'Proyectos de contenido, colaboraciones y servicios creativos de Abril Bianco.'
  },
  '/actress': {
    title: 'Actress | Abril Bianco',
    description: 'Portfolio actoral, reel y material audiovisual de Abril Bianco.'
  },
  '/contact': {
    title: 'Contact | Abril Bianco',
    description: 'Canales de contacto oficiales para proyectos y colaboraciones con Abril Bianco.'
  }
}

function setMetaTag(selector, attribute, value) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    const match = selector.match(/\[(name|property)="([^"]+)"\]/)
    if (match) {
      tag.setAttribute(match[1], match[2])
    }
    document.head.appendChild(tag)
  }
  tag.setAttribute(attribute, value)
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const location = useLocation()
  const { language } = useLanguage()
  const isHomePage = location.pathname === '/'
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const meta = pageMeta[location.pathname] || pageMeta['/']
    const canonicalUrl = `${window.location.origin}${location.pathname}`
    document.documentElement.lang = language
    document.title = meta.title
    setMetaTag('meta[name="description"]', 'content', meta.description)
    setMetaTag('meta[property="og:title"]', 'content', meta.title)
    setMetaTag('meta[property="og:description"]', 'content', meta.description)
    setMetaTag('meta[property="og:type"]', 'content', 'website')
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl)
    setMetaTag('meta[property="og:image"]', 'content', `${window.location.origin}/home/Firefly.webp`)
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image')

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [location.pathname, language])

  useEffect(() => {
    // Reset visibility when switching to home page
    if (isHomePage) {
      setIsVisible(false)
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage])

  useEffect(() => {
    let frameId = null
    const staticAtmosphereQuery = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)')

    const updateAtmosphere = () => {
      if (staticAtmosphereQuery.matches) {
        document.documentElement.style.setProperty('--ambient-shift', '0px')
        document.documentElement.style.setProperty('--ambient-opacity', '0.86')
        return
      }

      const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const scrollDepth = Math.min(window.scrollY / scrollableHeight, 1)
      document.documentElement.style.setProperty('--ambient-shift', `${scrollDepth * -72}px`)
      document.documentElement.style.setProperty('--ambient-opacity', (0.84 + scrollDepth * 0.12).toFixed(3))
    }

    const handleAtmosphereScroll = () => {
      if (staticAtmosphereQuery.matches) return
      if (frameId) return
      frameId = window.requestAnimationFrame(() => {
        updateAtmosphere()
        frameId = null
      })
    }

    updateAtmosphere()
    window.addEventListener('scroll', handleAtmosphereScroll, { passive: true })
    window.addEventListener('resize', handleAtmosphereScroll)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener('scroll', handleAtmosphereScroll)
      window.removeEventListener('resize', handleAtmosphereScroll)
    }
  }, [location.pathname])

  return (
    <>
      <ScrollToTop />
      <Navbar isVisible={isHomePage ? isVisible : true} isHomePage={isHomePage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        <Route path="/actress" element={<Actress />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App