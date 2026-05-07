import GhostCursor from './react-bits/GhostCursor'

function ReactBitsBackground() {
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
