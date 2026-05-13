import { Outlet, useLocation } from 'react-router-dom'
import Topbar from './Topbar'
import ReactBitsBackground from './ReactBitsBackground'
import ProductsBackground from './ProductsBackground'
import { useTranslation } from 'react-i18next'

const routeTheme = [
  { match: (path) => path === '/', accent: '#3b82f6', accentRgb: '59 130 246' },
  { match: (path) => path.startsWith('/weby'), accent: '#8b5cf6', accentRgb: '139 92 246' },
  { match: (path) => path.startsWith('/hosting'), accent: '#ef4444', accentRgb: '239 68 68' },
  { match: (path) => path.startsWith('/web-aplikace'), accent: '#ec4899', accentRgb: '236 72 153' },
  { match: (path) => path.startsWith('/kurzy'), accent: '#22c55e', accentRgb: '34 197 94' },
  { match: (path) => path.startsWith('/jine'), accent: '#f97316', accentRgb: '249 115 22' },
  { match: (path) => path.startsWith('/kontakt'), accent: '#3b82f6', accentRgb: '59 130 246' },
  { match: (path) => path.startsWith('/kalkulacka-ceny-webu'), accent: '#eab308', accentRgb: '234 179 8' },
]

function Layout() {
  const { t } = useTranslation('common')
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isProductPage = ['/weby', '/hosting', '/web-aplikace', '/kurzy', '/jine'].some((path) =>
    location.pathname.startsWith(path),
  )
  const activeTheme = routeTheme.find((theme) => theme.match(location.pathname)) || routeTheme[0]

  return (
    <div
      className="relative min-h-[100dvh] bg-[var(--bg)] text-[var(--text)]"
      style={{
        '--accent': activeTheme.accent,
        '--accent-rgb': activeTheme.accentRgb,
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[var(--bg)]" aria-hidden="true" />
      <div className="ambient-grid pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div className="ambient-blob ambient-blob--one pointer-events-none z-0" aria-hidden="true" />
      <div className="ambient-blob ambient-blob--two pointer-events-none z-0" aria-hidden="true" />
      <div className="ambient-blob ambient-blob--three pointer-events-none z-0" aria-hidden="true" />

      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-150 ${
          isHomePage ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <ReactBitsBackground />
      </div>

      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-150 ${
          isProductPage ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <ProductsBackground pagePath={location.pathname} accentColor={activeTheme.accent} />
      </div>

      <div className="relative z-10">
        <Topbar />
        <main key={location.pathname} className="page-reveal">
          <Outlet />
        </main>

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-5 text-sm text-slate-300 sm:flex-row sm:px-8 lg:px-12">
            <p>Solutions 24/7</p>
            <p>{t('nav.websites')} | {t('nav.hosting')} | {t('nav.webApps')} | 
            {t('nav.courses')} | {t('nav.other')} | {t('nav.contact')} | {t('nav.calculator')}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout
