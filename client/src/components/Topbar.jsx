import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Topbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation('common')

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/weby', label: t('nav.websites') },
    { to: '/hosting', label: t('nav.hosting') },
    { to: '/web-aplikace', label: t('nav.webApps') },
    { to: '/kurzy', label: t('nav.courses') },
    { to: '/jine', label: t('nav.other') },
    { to: '/kontakt', label: t('nav.contact') },
    { to: '/test', label: t('nav.test') },
  ]

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'cs' ? 'en' : 'cs'
    i18n.changeLanguage(nextLang)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link to="/" className="text-sm font-bold uppercase tracking-[0.26em] text-accent">
          OpusCode.dev
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
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
                `rounded-full px-4 py-2 text-sm transition ${
                  isActive ? '' : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Container */}
        <div className="flex items-center gap-3">
          
          {/* DropDown select */}
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="cursor-pointer rounded-md border border-white/20 bg-transparent px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-200 outline-none transition hover:bg-white/10 focus:border-accent focus:ring-1 focus:ring-accent"
            aria-label="Select Language"
          >
            <option value="cs" className="bg-slate-900">Čeština</option>
            <option value="en" className="bg-slate-900">English</option>
            <option value="de" className="bg-slate-900">Deutsch</option>
            <option value="pl" className="bg-slate-900">Polski</option>
          </select>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="rounded-md border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 transition hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            {t('menu')}
          </button>
        </div>
      </div>


      {isOpen && (
        <nav className="border-t border-white/10 bg-slate-950 px-5 py-3 md:hidden">
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