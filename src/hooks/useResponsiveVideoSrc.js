import { useEffect, useState } from 'react'

function getIsMobileVideo() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
}

export function useResponsiveVideoSrc(src, mobileSrc) {
  const [isMobileVideo, setIsMobileVideo] = useState(getIsMobileVideo)

  useEffect(() => {
    if (typeof window === 'undefined' || !mobileSrc) return

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const updateIsMobileVideo = () => setIsMobileVideo(mediaQuery.matches)

    updateIsMobileVideo()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateIsMobileVideo)
      return () => mediaQuery.removeEventListener('change', updateIsMobileVideo)
    }

    mediaQuery.addListener(updateIsMobileVideo)
    return () => mediaQuery.removeListener(updateIsMobileVideo)
  }, [mobileSrc])

  return isMobileVideo && mobileSrc ? mobileSrc : src
}
