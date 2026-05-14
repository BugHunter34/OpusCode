import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react' 
import { useTranslation } from 'react-i18next'


export const hasCookieConsent = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('opuscode-cookie-consent') === 'accepted'

/*
Export helper
    Usage:

import { hasCookieConsent } from './components/Cookies'

function someFunction() {
  if (hasCookieConsent()) {
    // Safe to store data
    localStorage.setItem('item', 'value')
  } else {
    // Do nothing, respect the rejection
  }
}
*/
}

export default function Cookies() {
  const { t } = useTranslation('common')
  const [isVisible, setIsVisible] = useState(false)
  const [hasDecided, setHasDecided] = useState(false)

useEffect(() => {
    // check on load
    const checkConsent = () => {
      const consent = localStorage.getItem('opuscode-cookie-consent')
      if (!consent) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setHasDecided(true)
        if (consent === 'accepted') {
          initializeTracking()
        }
      }
    }
    checkConsent()

    // listend to changes accross app
    const handleConsentUpdate = () => {
      checkConsent()
    }
    window.addEventListener('cookie-consent-updated', handleConsentUpdate)
    
    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate)
    }
  }, [])

  const initializeTracking = () => {
    // TODO: Google Analytics, Meta Pixel, etc. here.
    // This ONLY runs if they accepted.
    console.log("Cookie consent granted. Tracking initialized.")
  }

  const handleAccept = () => {
    localStorage.setItem('opuscode-cookie-consent', 'accepted')
    setIsVisible(false)
    setHasDecided(true)
    initializeTracking() // Start tracing when accepted
    
    // Dispatch custom event so other components (like iframes) 
    // can listen and re-render immediately without needing a page refresh.
    window.dispatchEvent(new Event('cookie-consent-updated'))
  }

  const handleReject = () => {
    // Save rejected 
    // TODO: Add button somewhere so user can change his mind and reaccept
    localStorage.setItem('opuscode-cookie-consent', 'rejected')
    setIsVisible(false)
    setHasDecided(true)
    console.log("Cookie consent rejected. No tracking initialized.")
    window.dispatchEvent(new Event('cookie-consent-updated'))
  }

  // when accepted/rejected show mini button
  if (!isVisible) return (
    <>
    {/* mini button, so user can change is decision*/}
     {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-4 left-4 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-400 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-slate-900/80 hover:text-accent sm:bottom-6 sm:left-6 animate-in fade-in zoom-in duration-300"
          aria-label={t('cookies.setting', { defaultValue: 'Cookies' })}
          title={t('cookies.setting', { defaultValue: 'Cookies' })}
        >
          <Cookie className="h-5 w-5" />
        </button>
      )}
    </>
  )
// else show the main banner
  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:bottom-6 sm:p-0 pointer-events-none flex justify-center">
      {/* Styling of PlanGrid */}
      <div className="glass-panel pointer-events-auto flex w-full max-w-4xl flex-col items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        <div className="flex items-start gap-4 sm:items-center">
          <div className="hidden rounded-full bg-accent/10 p-3 sm:block">
            <Cookie className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              {t('cookies.title', { defaultValue: 'Vaše soukromí, naše pravidla' })}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              {t('cookies.desc', { 
                defaultValue: 'Tento web používá cookies pro zajištění nejlepšího zážitku. Pokračováním souhlasíte s našimi ' 
              })}
              <a 
                href="https://www.opuscode.dev/tos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-accent-soft underline underline-offset-4 transition hover:text-accent"
              >
                {t('cookies.tos', { defaultValue: 'Podmínkami zpracování (TOS)' })}
              </a>.
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <button
            onClick={handleReject}
            className="rounded-xl border border-white/20 bg-transparent px-5 py-2.5 text-sm font-bold tracking-wider text-slate-200 transition hover:bg-white/10 sm:py-3"
          >
            {t('buttons.reject', { defaultValue: 'ODMÍTNOUT' })}
          </button>
          
          <button
            onClick={handleAccept}
            className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold tracking-wider text-slate-950 transition hover:brightness-95 sm:py-3 shadow-[0_4px_14px_rgb(var(--accent-rgb)_/_0.25)] hover:shadow-[0_6px_20px_rgb(var(--accent-rgb)_/_0.4)]"
          >
            {t('buttons.accept', { defaultValue: 'PŘIJMOUT VŠE' })}
          </button>
        </div>

      </div>
    </div>
</>
  )
  
}