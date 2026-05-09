import { useEffect, useState } from 'react'
import GhostCursor from './react-bits/GhostCursor'

function ReactBitsBackground() {
  const [shouldRenderEffect, setShouldRenderEffect] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setShouldRenderEffect(true)
      return
    }

    const mediaQueries = [
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(hover: hover)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(max-width: 767px)'),
    ]

    const update = () => {
      const hasFinePointer = mediaQueries[0].matches
      const hasHover = mediaQueries[1].matches
      const prefersReducedMotion = mediaQueries[2].matches
      const isSmallViewport = mediaQueries[3].matches

      setShouldRenderEffect(hasFinePointer && hasHover && !prefersReducedMotion && !isSmallViewport)
    }

    update()
    mediaQueries.forEach((query) => query.addEventListener('change', update))

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener('change', update))
    }
  }, [])

  if (!shouldRenderEffect) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <GhostCursor
          trailLength={100}
          inertia={0.15}
          grainIntensity={0.05}
          bloomStrength={0.0125}
          bloomRadius={0.3}
          brightness={0.125}
          color="#B497CF"
          edgeIntensity={0.1}
          zIndex={0}
          mixBlendMode="normal"
        />
      </div>
    </div>
  )
}

export default ReactBitsBackground
