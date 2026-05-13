import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './pages/Home'
import Content from './pages/Content'
import Actress from './pages/Actress'
import Contact from './pages/Contact'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [isVisible, setIsVisible] = useState(false)

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

    const updateAtmosphere = () => {
      const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const scrollDepth = Math.min(window.scrollY / scrollableHeight, 1)
      document.documentElement.style.setProperty('--ambient-shift', `${scrollDepth * -72}px`)
      document.documentElement.style.setProperty('--ambient-opacity', (0.84 + scrollDepth * 0.12).toFixed(3))
    }

    const handleAtmosphereScroll = () => {
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