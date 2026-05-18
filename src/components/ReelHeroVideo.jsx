import { useState, useRef, useEffect } from 'react'
import './ReelHeroVideo.css'

function ReelHeroVideo({ 
  previewSrc, 
  fullSrc, 
  poster,
  onContextMenu 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [shouldPlay, setShouldPlay] = useState(false)
  const videoRef = useRef(null)

  // Lazy load and autoplay preview
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPlay(true)
        } else {
          setShouldPlay(false)
          video.pause()
        }
      },
      { threshold: 0.25, rootMargin: '100px' }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldPlay) return

    const play = () => {
      const playPromise = video.play()
      if (playPromise) {
        playPromise.catch(() => {})
      }
    }

    if (video.readyState >= 2) {
      play()
    } else {
      video.addEventListener('canplay', play, { once: true })
    }
  }, [shouldPlay])

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsClosing(false)
      document.body.style.overflow = 'unset'
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isModalOpen])

  return (
    <>
      <div className="reel-hero" onClick={openModal}>
        <video
          ref={videoRef}
          className="reel-hero__preview"
          muted
          loop
          playsInline
          preload={shouldPlay ? "metadata" : "none"}
          poster={poster}
          onContextMenu={onContextMenu}
        >
          {shouldPlay && <source src={previewSrc} type="video/mp4" />}
        </video>
        <div className="reel-hero__overlay">
          <span className="reel-hero__play-icon">▶</span>
        </div>
      </div>

      {(isModalOpen || isClosing) && (
        <div 
          className={`reel-modal ${isClosing ? 'closing' : ''}`} 
          onClick={closeModal}
        >
          <div className="reel-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="reel-modal__close" onClick={closeModal}>×</button>
            <video
              key={fullSrc}
              src={fullSrc}
              className="reel-modal__video"
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={poster}
              onContextMenu={onContextMenu}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ReelHeroVideo
