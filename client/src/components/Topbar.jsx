import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Topbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation('common')
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/weby', label: t('nav.websites') },
    { to: '/hosting', label: t('nav.hosting') },
    { to: '/web-aplikace', label: t('nav.webApps') },
    { to: '/kurzy', label: t('nav.courses') },
    { to: '/jine', label: t('nav.other') },
    { to: '/kalkulacka-ceny-webu', label: t('nav.calculator') },
    { to: '/kontakt', label: t('nav.contact') },
    { to: '/test', label: t('nav.test') },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-5 sm:py-3 lg:px-12 lg:py-4">
        <Link
          to="/"
          className="topbar-brand font-display shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-accent transition hover:opacity-90 sm:text-xs sm:tracking-[0.2em] lg:text-sm lg:tracking-[0.3em]"
        >
          <span className="sm:hidden">OPUS</span>
          <span className="hidden sm:inline">OpusCode.dev</span>
        </Link>

        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: 'var(--accent)', color: '#0f172a' }
                  : undefined
              }
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition xl:px-4 ${
                  isActive ? 'shadow-[0_0_20px_rgb(var(--accent-rgb)_/_0.35)]' : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Container */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* DropDown select */}
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="w-[64px] cursor-pointer rounded-md border border-white/20 bg-slate-900/55 px-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-200 outline-none transition hover:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent sm:w-[72px] sm:px-2 lg:w-auto lg:text-xs"
            aria-label="Select Language"
          >
            <option value="cs" className="bg-slate-900">CS</option>
            <option value="sk" className="bg-slate-900">SK</option>
            <option value="en" className="bg-slate-900">EN</option>
            <option value="de" className="bg-slate-900">DE</option>
            <option value="pl" className="bg-slate-900">PL</option>
            
          </select>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-slate-900/55 text-slate-200 transition hover:bg-white/10 sm:h-9 sm:w-9 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">{t('menu')}</span>
            <span className="relative block h-3 w-4 sm:h-3.5 sm:w-4.5">
              <span className={`absolute left-0 top-0 h-[2px] w-full rounded bg-current transition ${isOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[6px] h-[2px] w-full rounded bg-current transition ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 top-[12px] h-[2px] w-full rounded bg-current transition ${isOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>


      {isOpen && (
        <nav id="mobile-nav" className="border-t border-white/10 bg-slate-950/95 px-3 py-3 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: 'var(--accent)', color: '#0f172a' }
                    : undefined
                }
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm transition ${isActive ? '' : 'text-slate-200 hover:bg-white/10'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Topbar