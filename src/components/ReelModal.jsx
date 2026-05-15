import { useEffect, useState } from 'react'

function ReelModal({ isOpen, onClose, videoSrc = '/actress/reel_converted.mp4', poster }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

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

        {!isVideoLoaded && !poster && <div className="reel-modal-skeleton" />}
        <video
          key={videoSrc}
          src={videoSrc}
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster={poster}
          className="reel-modal-video"
          onCanPlay={() => setIsVideoLoaded(true)}
          onLoadedData={() => setIsVideoLoaded(true)}
        />
      </div>
    </div>
  )
}

export default ReelModal