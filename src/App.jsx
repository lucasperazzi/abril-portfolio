import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './pages/Home'
import Content from './pages/Content'
import Actress from './pages/Actress'
import Contact from './pages/Contact'
import './App.css'

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

  return (
    <>
      <Navbar isVisible={isHomePage ? isVisible : true} />
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