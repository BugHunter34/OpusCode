import { GridScan } from './react-bits/GridScan'

function mixHex(baseHex, mixHexColor, amount) {
  const clampAmount = Math.max(0, Math.min(1, amount))
  const base = baseHex.replace('#', '')
  const mix = mixHexColor.replace('#', '')

  const br = parseInt(base.slice(0, 2), 16)
  const bg = parseInt(base.slice(2, 4), 16)
  const bb = parseInt(base.slice(4, 6), 16)

  const mr = parseInt(mix.slice(0, 2), 16)
  const mg = parseInt(mix.slice(2, 4), 16)
  const mb = parseInt(mix.slice(4, 6), 16)

  const rr = Math.round(br * (1 - clampAmount) + mr * clampAmount)
  const rg = Math.round(bg * (1 - clampAmount) + mg * clampAmount)
  const rb = Math.round(bb * (1 - clampAmount) + mb * clampAmount)

  return `#${rr.toString(16).padStart(2, '0')}${rg.toString(16).padStart(2, '0')}${rb
    .toString(16)
    .padStart(2, '0')}`
}

const pagePalette = {
  '/weby': { scanColor: '#c555e0', linesColor: '#4c1d95' },
  '/hosting': { scanColor: '#ef4444', linesColor: '#7f1d1d' },
  '/web-aplikace': { scanColor: '#f180c6', linesColor: '#831843' },
  '/kurzy': { scanColor: '#22c55e', linesColor: '#14532d' },
  '/jine': { scanColor: '#f1a772', linesColor: '#9a3412' },
}

function hexToRgba(hexColor, alpha) {
  const raw = hexColor.replace('#', '')
  const r = parseInt(raw.slice(0, 2), 16)
  const g = parseInt(raw.slice(2, 4), 16)
  const b = parseInt(raw.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function ProductsBackground({ pagePath = '/weby', accentColor = '#8b5cf6' }) {
  const palette = pagePalette[pagePath] || {
    scanColor: accentColor,
    linesColor: mixHex(accentColor, '#0f172a', 0.68),
  }
  const scanColor = palette.scanColor
  const linesColor = palette.linesColor
  const tint = hexToRgba(scanColor, 0.14)

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          background: `radial-gradient(circle at 72% 22%, ${tint}, transparent 46%), var(--bg)`,
        }}
      >
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor={linesColor}
          scanColor={scanColor}
          scanOpacity={0.42}
          gridScale={0.1}
          lineStyle="solid"
          lineJitter={0.1}
          scanDirection="backward"
          noiseIntensity={0.006}
          scanGlow={0.62}
          scanSoftness={2}
          scanDuration={2}
          scanDelay={2}
          scanOnClick={false}
        />
      </div>
    </div>
  )
}

export default ProductsBackground
