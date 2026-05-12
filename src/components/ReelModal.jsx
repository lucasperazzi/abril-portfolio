import { useEffect, useRef, useState } from 'react'

function ReelModal({ isOpen, onClose, videoSrc = '/actress/reel_converted.mp4' }) {
  const preloadedVideoRef = useRef(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const href = new URL(videoSrc, window.location.origin).href
    const existingPreload = Array.from(document.querySelectorAll('link[rel="preload"][as="video"]')).some((link) => link.href === href)

    if (!existingPreload) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'video'
      link.href = videoSrc
      link.type = 'video/mp4'
      link.setAttribute('fetchpriority', 'high')
      document.head.appendChild(link)
    }

    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.src = videoSrc
    video.load()
    preloadedVideoRef.current = video

    return () => {
      video.removeAttribute('src')
      video.load()
      preloadedVideoRef.current = null
    }
  }, [videoSrc])

  useEffect(() => {
    if (isOpen) {
      setIsVideoLoaded(false)
    }
  }, [isOpen, videoSrc])

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden' // bloquear scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="reel-modal-overlay"
      onClick={onClose} // cerrar al hacer click fuera
    >
      {/* CONTENEDOR VIDEO */}
      <div
        className="reel-modal-content"
        onClick={(e) => e.stopPropagation()} // evitar cerrar al clickear video
      >
        {/* BOTÓN CERRAR */}
        <button
          type="button"
          onClick={onClose}
          className="reel-modal-close"
        >
          ×
        </button>

        {!isVideoLoaded && <div className="reel-modal-skeleton" />}
        <video
          src={videoSrc}
          controls
          autoPlay
          playsInline
          className="reel-modal-video"
          onCanPlay={() => setIsVideoLoaded(true)}
          onLoadedData={() => setIsVideoLoaded(true)}
        />
      </div>
    </div>
  )
}

export default ReelModal