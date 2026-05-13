import LightRays from './react-bits/LightRays'

function LightRaysBackground({ raysColor = '#ffffff' }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor={raysColor}
          raysSpeed={1.2}
          lightSpread={1.25}
          rayLength={3}
          pulsating={false}
          fadeDistance={1.35}
          saturation={1.25}
          followMouse
          mouseInfluence={0.18}
          noiseAmount={0}
          distortion={0}
        />
      </div>
    </div>
  )
}

export default LightRaysBackground
