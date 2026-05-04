import { useEffect } from 'react'

function ReelModal({ isOpen, onClose }) {
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
      {/* BOTÓN CERRAR */}
      <button
        onClick={onClose}
        className="reel-modal-close"
      >
        ✕
      </button>

      {/* CONTENEDOR VIDEO */}
      <div
        className="reel-modal-content"
        onClick={(e) => e.stopPropagation()} // evitar cerrar al clickear video
      >
        {/* VIDEO */}
        <video
          controls
          autoPlay
          playsInline
          className="reel-modal-video"
        >
          <source src="/video/reel_converted.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default ReelModal