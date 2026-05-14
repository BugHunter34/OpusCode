import { Outlet, useLocation } from 'react-router-dom'
import Topbar from './Topbar'
import ReactBitsBackground from './ReactBitsBackground'
import ProductsBackground from './ProductsBackground'
import LightRaysBackground from './LightRaysBackground'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import useLowEndDevice from '../hooks/useLowEndDevice'

const routeTheme = [
  {
    match: (path) => path === '/',
    accent: '#3b82f6',
    accentRgb: '59 130 246',
    tertiary: '#3b82f6',
    tertiaryRgb: '59 130 246',
    inquiryBlob1: '#60a5fa',
    inquiryBlob2: '#3b82f6',
    inquiryBlob3: '#1d4ed8',
    inquiryBlob4: '#1e40af',
  },
  {
    match: (path) => path.startsWith('/weby'),
    accent: '#8b5cf6',
    accentRgb: '139 92 246',
    tertiary: '#3b82f6',
    tertiaryRgb: '59 130 246',
    inquiryBlob1: '#c4b5fd',
    inquiryBlob2: '#a78bfa',
    inquiryBlob3: '#8b5cf6',
    inquiryBlob4: '#6d28d9',
  },
  {
    match: (path) => path.startsWith('/hosting'),
    accent: '#ef4444',
    accentRgb: '239 68 68',
    tertiary: '#f97316',
    tertiaryRgb: '249 115 22',
    inquiryBlob1: '#fca5a5',
    inquiryBlob2: '#f87171',
    inquiryBlob3: '#ef4444',
    inquiryBlob4: '#b91c1c',
  },
  {
    match: (path) => path.startsWith('/web-aplikace'),
    accent: '#ec4899',
    accentRgb: '236 72 153',
    tertiary: '#8b5cf6',
    tertiaryRgb: '139 92 246',
    inquiryBlob1: '#f9a8d4',
    inquiryBlob2: '#f472b6',
    inquiryBlob3: '#ec4899',
    inquiryBlob4: '#be185d',
  },
  {
    match: (path) => path.startsWith('/kurzy'),
    accent: '#22c55e',
    accentRgb: '34 197 94',
    tertiary: '#166534',
    tertiaryRgb: '22 101 52',
    inquiryBlob1: '#86efac',
    inquiryBlob2: '#4ade80',
    inquiryBlob3: '#22c55e',
    inquiryBlob4: '#166534',
  },
  {
    match: (path) => path.startsWith('/jine'),
    accent: '#f97316',
    accentRgb: '249 115 22',
    tertiary: '#ef4444',
    tertiaryRgb: '239 68 68',
    inquiryBlob1: '#fdba74',
    inquiryBlob2: '#fb923c',
    inquiryBlob3: '#f97316',
    inquiryBlob4: '#c2410c',
  },
  {
    match: (path) => path.startsWith('/kontakt'),
    accent: '#3b82f6',
    accentRgb: '59 130 246',
    tertiary: '#14b8a6',
    tertiaryRgb: '20 184 166',
    inquiryBlob1: '#93c5fd',
    inquiryBlob2: '#60a5fa',
    inquiryBlob3: '#3b82f6',
    inquiryBlob4: '#1d4ed8',
  },
  {
    match: (path) => path.startsWith('/kalkulacka-ceny-webu'),
    accent: '#eab308',
    accentRgb: '234 179 8',
    tertiary: '#14b8a6',
    tertiaryRgb: '20 184 166',
    inquiryBlob1: '#fde047',
    inquiryBlob2: '#facc15',
    inquiryBlob3: '#eab308',
    inquiryBlob4: '#a16207',
  },
]

function Layout() {
  const { t } = useTranslation('common')
  const location = useLocation()
  const isLowEndDevice = useLowEndDevice()
  const isHomePage = location.pathname === '/'
  const isProductPage = ['/weby', '/hosting', '/web-aplikace', '/kurzy', '/jine'].some((path) =>
    location.pathname.startsWith(path),
  )
  const isLightRaysPage = ['/kalkulacka-ceny-webu', '/kontakt', '/test'].some((path) =>
    location.pathname.startsWith(path),
  )
  const lightRaysColor = location.pathname.startsWith('/kalkulacka-ceny-webu')
    ? '#eab308'
    : location.pathname.startsWith('/kontakt')
      ? '#3b82f6'
      : '#ffffff'
  const activeTheme = routeTheme.find((theme) => theme.match(location.pathname)) || routeTheme[0]
  const footerNavItems = [
    { key: 'websites', label: t('nav.websites'), isActive: location.pathname.startsWith('/weby') },
    { key: 'hosting', label: t('nav.hosting'), isActive: location.pathname.startsWith('/hosting') },
    { key: 'webApps', label: t('nav.webApps'), isActive: location.pathname.startsWith('/web-aplikace') },
    { key: 'courses', label: t('nav.courses'), isActive: location.pathname.startsWith('/kurzy') },
    { key: 'other', label: t('nav.other'), isActive: location.pathname.startsWith('/jine') },
    { key: 'contact', label: t('nav.contact'), isActive: location.pathname.startsWith('/kontakt') },
    { key: 'calculator', label: t('nav.calculator'), isActive: location.pathname.startsWith('/kalkulacka-ceny-webu') },
  ]

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.classList.toggle('performance-low', isLowEndDevice)
    document.documentElement.classList.toggle('performance-high', !isLowEndDevice)
  }, [isLowEndDevice])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const rootStyle = document.documentElement.style
    rootStyle.setProperty('--accent', activeTheme.accent)
    rootStyle.setProperty('--accent-rgb', activeTheme.accentRgb)
    rootStyle.setProperty('--accent-tertiary', activeTheme.tertiary)
    rootStyle.setProperty('--accent-tertiary-rgb', activeTheme.tertiaryRgb)
    rootStyle.setProperty('--inquiry-blob-1', activeTheme.inquiryBlob1)
    rootStyle.setProperty('--inquiry-blob-2', activeTheme.inquiryBlob2)
    rootStyle.setProperty('--inquiry-blob-3', activeTheme.inquiryBlob3)
    rootStyle.setProperty('--inquiry-blob-4', activeTheme.inquiryBlob4)
  }, [activeTheme])

  return (
    <div
      className="relative flex min-h-[100dvh] flex-col bg-[var(--bg)] text-[var(--text)]"
      style={{
        '--accent': activeTheme.accent,
        '--accent-rgb': activeTheme.accentRgb,
        '--accent-tertiary': activeTheme.tertiary,
        '--accent-tertiary-rgb': activeTheme.tertiaryRgb,
        '--inquiry-blob-1': activeTheme.inquiryBlob1,
        '--inquiry-blob-2': activeTheme.inquiryBlob2,
        '--inquiry-blob-3': activeTheme.inquiryBlob3,
        '--inquiry-blob-4': activeTheme.inquiryBlob4,
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {isLightRaysPage && !isLowEndDevice ? (
          <div className="absolute inset-0 transition-opacity duration-150 opacity-100">
            <LightRaysBackground raysColor={lightRaysColor} />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-[var(--bg)]" />
            <div className="ambient-grid absolute inset-0" />
            {!isLowEndDevice ? (
              <>
                <div className="ambient-blob ambient-blob--one" />
                <div className="ambient-blob ambient-blob--two" />
                <div className="ambient-blob ambient-blob--three" />
              </>
            ) : null}

            <div
              className={`absolute inset-0 transition-opacity duration-150 ${
                isHomePage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {!isLowEndDevice ? <ReactBitsBackground /> : null}
            </div>

            {isProductPage && !isLowEndDevice ? (
              <div className="absolute inset-0 transition-opacity duration-150 opacity-100">
                <ProductsBackground pagePath={location.pathname} accentColor={activeTheme.accent} />
              </div>
            ) : null}
          </>
        )}
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <Topbar />
        <main key={location.pathname} className="page-reveal flex-1">
          <Outlet />
        </main>

        <footer className="py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-5 text-sm text-slate-300 sm:flex-row sm:px-8 lg:px-12">
            <p>Solutions 24/7</p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {footerNavItems.map((item, index) => (
                <span key={item.key} className="inline-flex items-center">
                  {index > 0 ? <span className="mr-2 text-slate-500">|</span> : null}
                  <span className={item.isActive ? 'font-semibold text-accent drop-shadow-[0_0_10px_rgb(var(--accent-rgb)_/_0.35)]' : undefined}>
                    {item.label}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout
