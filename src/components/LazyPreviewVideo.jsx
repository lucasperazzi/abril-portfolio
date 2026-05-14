import { useEffect, useRef, useState } from 'react'

function LazyPreviewVideo({
  src,
  poster,
  className,
  skeletonClassName,
  onContextMenu,
  rootMargin = '180px 0px',
  threshold = 0.25
}) {
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [shouldPlay, setShouldPlay] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setShouldLoad(false)
    setShouldPlay(false)
    setIsLoaded(false)
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      setShouldPlay(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          setShouldPlay(true)
        } else {
          setShouldPlay(false)
          video.pause()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    video.load()
  }, [shouldLoad, src])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad || !shouldPlay) return

    const play = () => {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }

    if (video.readyState >= 2) {
      play()
      return
    }

    video.addEventListener('canplay', play, { once: true })
    return () => video.removeEventListener('canplay', play)
  }, [shouldLoad, shouldPlay, src])

  return (
    <>
      {skeletonClassName && !poster && !isLoaded && <div className={skeletonClassName} />}
      <video
        ref={videoRef}
        className={className}
        muted
        loop
        playsInline
        preload={shouldLoad ? 'metadata' : 'none'}
        poster={poster}
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
        onContextMenu={onContextMenu}
      >
        {shouldLoad && <source src={src} type="video/mp4" />}
      </video>
    </>
  )
}

export default LazyPreviewVideo
