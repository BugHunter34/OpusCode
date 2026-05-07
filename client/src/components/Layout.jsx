import { Outlet, useLocation } from 'react-router-dom'
import Topbar from './Topbar'
import ReactBitsBackground from './ReactBitsBackground'
import ProductsBackground from './ProductsBackground'

const routeTheme = [
  { match: (path) => path === '/', accent: '#3b82f6', accentRgb: '59 130 246' },
  { match: (path) => path.startsWith('/weby'), accent: '#8b5cf6', accentRgb: '139 92 246' },
  { match: (path) => path.startsWith('/hosting'), accent: '#ef4444', accentRgb: '239 68 68' },
  { match: (path) => path.startsWith('/web-aplikace'), accent: '#ec4899', accentRgb: '236 72 153' },
  { match: (path) => path.startsWith('/kurzy'), accent: '#22c55e', accentRgb: '34 197 94' },
  { match: (path) => path.startsWith('/jine'), accent: '#f97316', accentRgb: '249 115 22' },
  { match: (path) => path.startsWith('/kontakt'), accent: '#3b82f6', accentRgb: '59 130 246' },
]

function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isProductPage = ['/weby', '/hosting', '/web-aplikace', '/kurzy', '/jine'].includes(location.pathname)
  const activeTheme = routeTheme.find((theme) => theme.match(location.pathname)) || routeTheme[0]

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]"
      style={{
        '--accent': activeTheme.accent,
        '--accent-rgb': activeTheme.accentRgb,
      }}
    >
      {isHomePage && <ReactBitsBackground />}
      {isProductPage && (
        <ProductsBackground key={location.pathname} pagePath={location.pathname} accentColor={activeTheme.accent} />
      )}

      <div className="relative z-10">
        <Topbar />
        <Outlet />

        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-5 text-sm text-slate-300 sm:flex-row sm:px-8 lg:px-12">
            <p>Solutions 24/7</p>
            <p>Weby | Hosting | Webové aplikace | Kurzy | Jiné | Kontakt</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout
