import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { Code2, Gauge, GraduationCap, LayoutTemplate, Mail, MapPin, Phone, Rocket, ScrollText, Search, ServerCog } from 'lucide-react'

const API_BASE_URL = 'https://api.opuscode.dev'

const getInitialLandingForm = () => ({
  fullName: '',
  email: '',
  phone: '',
  note: '',
  gdprConsent: false,
})

function ScrollReveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentElement = elementRef.current
    if (!currentElement) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setIsVisible(true)
        observer.unobserve(entry.target)
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    observer.observe(currentElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Tag
      ref={elementRef}
      className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function HomePage() {
  const { t, i18n } = useTranslation(['home', 'common'])
  const [landingForm, setLandingForm] = useState(getInitialLandingForm)
  const [landingStatus, setLandingStatus] = useState({ type: 'idle', message: '' })
  const [isLandingSubmitting, setIsLandingSubmitting] = useState(false)
  const [contactActionMessage, setContactActionMessage] = useState({ type: 'idle', message: '' })
  const contactMessageTimeoutRef = useRef(null)

  const portfolio = [
    {
      name: 'Muzeer',
      type: t('portfolio.types.webApp'),
      result: t('portfolio.results.muzeer'),
      url: 'https://muzeer.com',
    },
    {
      name: 'Conpath',
      type: t('portfolio.types.bigWeb'),
      result: t('portfolio.results.conpath'),
      url: 'https://conpath.info',
    },
    {
      name: 'afrox26TP',
      type: t('portfolio.types.basicWeb'),
      result: t('portfolio.results.afrox'),
      url: 'https://afrox26tp.com',
    },
  ]

  const stepIcons = [Search, MapPin, Rocket, Gauge, ScrollText, Search]

  const collaborationSteps = [1, 2, 3, 4, 5, 6].map((num, index) => ({
    id: num,
    icon: stepIcons[index] || Search,
    title: t(`collaboration.step${num}.title`),
    desc: t(`collaboration.step${num}.desc`),
  }))

  const serviceCards = [
    {
      icon: LayoutTemplate,
      title: t('common:nav.websites'),
      desc: t('order.services.websites'),
      to: '/weby',
    },
    {
      icon: ServerCog,
      title: t('common:nav.hosting'),
      desc: t('order.services.hosting'),
      to: '/hosting',
    },
    {
      icon: Code2,
      title: t('common:nav.webApps'),
      desc: t('order.services.webApps'),
      to: '/web-aplikace',
    },
    {
      icon: GraduationCap,
      title: t('common:nav.courses'),
      desc: t('order.services.courses'),
      to: '/kurzy',
    },
    {
      icon: Gauge,
      title: t('common:nav.other'),
      desc: t('order.services.other'),
      to: '/jine',
    },
    {
      icon: Mail,
      title: t('order.services.moreTitle'),
      desc: t('order.services.moreDesc'),
      to: '/kontakt',
    },
  ]

  const canSubmitLandingForm =
    landingForm.fullName.trim() && landingForm.email.trim() && landingForm.gdprConsent

  const handleLandingFieldChange = (event) => {
    const { name, value, type, checked } = event.target
    setLandingForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleLandingSubmit = async (event) => {
    event.preventDefault()

    if (!canSubmitLandingForm) {
      setLandingStatus({ type: 'error', message: t('common:errors.formIncomplete') })
      return
    }

    setIsLandingSubmitting(true)
    setLandingStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'Landing contact',
          planName: 'Quick message',
          planPrice: 'Custom',
          fullName: landingForm.fullName,
          email: landingForm.email,
          phone: landingForm.phone,
          company: '',
          note: landingForm.note,
          gdprConsent: landingForm.gdprConsent,
          lang: i18n.language,
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.detail || t('common:errors.apiFallback'))
      }

      setLandingStatus({
        type: 'success',
        message: responseData.message || t('common:messages.success'),
      })
      setLandingForm(getInitialLandingForm())
    } catch (error) {
      setLandingStatus({
        type: 'error',
        message: error.message || t('common:errors.general'),
      })
    } finally {
      setIsLandingSubmitting(false)
    }
  }

  const showContactActionMessage = (type, message) => {
    if (contactMessageTimeoutRef.current) {
      window.clearTimeout(contactMessageTimeoutRef.current)
    }

    setContactActionMessage({ type, message })
    contactMessageTimeoutRef.current = window.setTimeout(() => {
      setContactActionMessage({ type: 'idle', message: '' })
      contactMessageTimeoutRef.current = null
    }, 2200)
  }

  const copyTextFallback = (text) => {
    const input = document.createElement('textarea')
    input.value = text
    input.setAttribute('readonly', '')
    input.style.position = 'absolute'
    input.style.left = '-9999px'
    document.body.appendChild(input)
    input.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(input)
    return copied
  }

  const handleEmailClick = async (event) => {
    event.preventDefault()
    const email = 'kontakt@opuscode.dev'

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email)
      } else {
        const copied = copyTextFallback(email)
        if (!copied) {
          throw new Error('copy-failed')
        }
      }

      showContactActionMessage('success', t('finalCta.feedback.emailCopied'))
    } catch {
      showContactActionMessage('error', t('finalCta.feedback.emailCopyFailed'))
    }
  }

  const handlePhoneClick = (event) => {
    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone|Mobi/i.test(navigator.userAgent)

    if (!isMobile) {
      return
    }

    event.preventDefault()
    window.location.href = 'tel:+420737911901'
  }

  useEffect(() => {
    return () => {
      if (contactMessageTimeoutRef.current) {
        window.clearTimeout(contactMessageTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <section className="mx-auto w-full max-w-[92rem] px-5 pb-14 pt-16 sm:px-8 lg:px-14">
        <ScrollReveal as="article" delay={0} className="relative py-6 sm:py-10 lg:py-14">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[78%] opacity-35"
            style={{
              background:
                'linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, rgba(255,255,255,0) 56%)',
              filter: 'blur(32px)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-[6%] top-[12%] h-[58%] opacity-28"
            style={{
              background:
                'radial-gradient(circle at 30% 40%, rgba(86,176,255,0.34), rgba(86,176,255,0) 52%), radial-gradient(circle at 72% 52%, rgba(153,102,255,0.18), rgba(153,102,255,0) 46%)',
              filter: 'blur(28px)',
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute -left-20 -top-8 h-72 w-72 rounded-full bg-[rgb(var(--accent-rgb)_/_0.2)] blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute left-[34%] top-20 h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl" aria-hidden="true" />

          <p className="relative font-mono text-xs uppercase tracking-[0.28em] text-accent">{t('hero.tag')}</p>
          <h1 className="font-display relative mt-5 max-w-6xl text-5xl font-semibold leading-[0.98] text-white sm:text-7xl lg:text-[5.7rem]">
            <Trans
              i18nKey="hero.title"
              t={t}
              components={{
                accent: (
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgb(var(--accent-rgb)_/_0.5)]" />
                ),
              }}
            />
          </h1>
          <p className="relative mt-6 max-w-3xl text-base text-slate-300 sm:text-xl">
            {t('hero.subtitle')}
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <Link
              to="/weby"
              className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-[0_0_30px_rgb(var(--accent-rgb)_/_0.4)] transition hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {t('hero.btnWeb')}
            </Link>
            <Link to="/web-aplikace" className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-white/10">
              {t('hero.btnApp')}
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-[92rem] px-5 pb-14 sm:px-8 lg:px-14">
        <ScrollReveal delay={80} className="py-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t('basicInfo.altTitle')}</p>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            <div className="border-b border-white/12 px-1 pb-3 pt-1 text-slate-200">{t('basicInfo.item1')}</div>
            <div className="border-b border-white/12 px-1 pb-3 pt-1 text-slate-200">{t('basicInfo.item2')}</div>
            <div className="border-b border-white/12 px-1 pb-3 pt-1 text-slate-200">{t('basicInfo.item3')}</div>
            <div className="border-b border-white/12 px-1 pb-3 pt-1 text-slate-200">{t('basicInfo.item4')}</div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t('order.title')}</p>
            <p className="mt-3 text-slate-200">{t('order.text')}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {serviceCards.map((service, index) => (
                <ScrollReveal
                  as="article"
                  key={service.to}
                  delay={70 + index * 70}
                  className="rounded-2xl border border-white/12 bg-[rgb(9_18_34_/_0.72)] p-5 transition hover:-translate-y-0.5 hover:border-accent-soft"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-accent">
                    <service.icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-slate-300">{service.desc}</p>
                  <Link
                    to={service.to}
                    className="mt-4 inline-block text-sm font-semibold text-accent-soft underline underline-offset-4 transition hover:text-accent"
                  >
                    {service.to === '/kontakt' ? t('common:nav.contact') : t('portfolio.open')}
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-[92rem] px-5 pb-14 sm:px-8 lg:px-14">
        <ScrollReveal delay={80} className="border-t border-white/10 pt-8">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{t('collaboration.title')}</h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            {t('collaboration.subtitle')}
          </p>
          <div className="timeline mt-8">
            <div className="timeline__line" aria-hidden="true" />
            {collaborationSteps.map((step, index) => (
              <ScrollReveal
                as="article"
                key={step.id}
                delay={80 + index * 90}
                className="timeline__item"
              >
                <div className="timeline__dot" aria-hidden="true">
                  <step.icon size={20} strokeWidth={2.5} />
                </div>
                <div className="timeline__card">
                  <p className="font-display text-2xl font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-slate-200">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto w-full max-w-[92rem] px-5 pb-16 sm:px-8 lg:px-14">
        <ScrollReveal as="h2" delay={40} className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {t('portfolio.title')}
        </ScrollReveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {portfolio.map((project, index) => (
            <ScrollReveal
              as="article"
              key={project.name}
              delay={120 + index * 90}
              className="border-b border-white/12 pb-5 pt-1 transition hover:border-accent-soft"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{project.type}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
              <p className="mt-2 text-slate-300">{project.result}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-accent-soft underline underline-offset-4 hover:text-accent transition"
              >
                {t('portfolio.open')}
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[92rem] px-5 pb-20 sm:px-8 lg:px-14">
        <ScrollReveal
          delay={80}
          className="p-0"
        >
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <article>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">{t('finalCta.tag')}</p>
              <h2 className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {t('finalCta.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-slate-300 sm:text-lg">{t('finalCta.text')}</p>

              <div className="mt-7 grid gap-3 sm:max-w-2xl sm:grid-cols-3">
                <a
                  href="mailto:kontakt@opuscode.dev"
                  onClick={handleEmailClick}
                  className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-3 text-sm text-slate-200 transition hover:border-accent-soft hover:text-white"
                >
                  <Mail size={16} className="text-accent" />
                  <span>{t('finalCta.items.email')}</span>
                </a>
                <a
                  href="tel:+420737911901"
                  onClick={handlePhoneClick}
                  className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-3 text-sm text-slate-200 transition hover:border-accent-soft hover:text-white"
                >
                  <Phone size={16} className="text-accent" />
                  <span>{t('finalCta.items.phone')}</span>
                </a>
                <div className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-3 text-sm text-slate-200">
                  <MapPin size={16} className="text-accent" />
                  <span>{t('finalCta.items.location')}</span>
                </div>
              </div>

              {contactActionMessage.message && (
                <p
                  className={`mt-3 text-sm ${contactActionMessage.type === 'success' ? 'text-lime-300' : 'text-rose-300'}`}
                  role="status"
                  aria-live="polite"
                >
                  {contactActionMessage.message}
                </p>
              )}
            </article>

            <article className="rounded-2xl border border-white/12 bg-[rgb(10_23_42_/_0.88)] p-5 sm:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t('finalCta.cardTag')}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{t('finalCta.cardTitle')}</h3>
              <p className="mt-3 text-slate-300">{t('finalCta.cardText')}</p>

              <form className="mt-5 space-y-3" onSubmit={handleLandingSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {t('common:form.name')}
                    <input
                      required
                      name="fullName"
                      value={landingForm.fullName}
                      onChange={handleLandingFieldChange}
                      placeholder="Jan Novak"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-slate-500 focus:border-accent-soft"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {t('common:form.email')}
                    <input
                      required
                      type="email"
                      name="email"
                      value={landingForm.email}
                      onChange={handleLandingFieldChange}
                      placeholder="jan@firma.cz"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-slate-500 focus:border-accent-soft"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {t('common:form.phone')}
                  <input
                    name="phone"
                    value={landingForm.phone}
                    onChange={handleLandingFieldChange}
                    placeholder="+420 123 456 789"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-slate-500 focus:border-accent-soft"
                  />
                </label>

                <label className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {t('common:form.note')}
                  <textarea
                    name="note"
                    rows={4}
                    value={landingForm.note}
                    onChange={handleLandingFieldChange}
                    placeholder={t('common:form.notePlaceholder')}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none transition placeholder:text-slate-500 focus:border-accent-soft"
                  />
                </label>

                <label className="flex items-start gap-2 pt-1 text-xs leading-relaxed text-slate-300">
                  <input
                    name="gdprConsent"
                    type="checkbox"
                    checked={landingForm.gdprConsent}
                    onChange={handleLandingFieldChange}
                    className="mt-1 shrink-0"
                  />
                  <span>
                    <Trans
                      i18nKey="form.gdpr"
                      t={t}
                      ns="common"
                      components={{
                        1: (
                          <Link
                            to="/tos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-accent-soft underline underline-offset-4 transition hover:text-accent"
                          />
                        ),
                      }}
                    />
                  </span>
                </label>

                {landingStatus.message && (
                  <p className={`text-sm ${landingStatus.type === 'success' ? 'text-lime-300' : 'text-rose-300'}`}>
                    {landingStatus.message}
                  </p>
                )}

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isLandingSubmitting || !canSubmitLandingForm}
                    className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-[0_0_26px_rgb(45_212_191_/_0.45)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ backgroundColor: '#34d399' }}
                  >
                    {isLandingSubmitting ? t('common:buttons.submitting') : t('finalCta.primaryBtn')}
                  </button>
                  <Link
                    to="/kontakt"
                    className="text-sm font-semibold text-accent-soft underline underline-offset-4 transition hover:text-accent"
                  >
                    {t('common:nav.contact')}
                  </Link>
                </div>
              </form>
            </article>
          </div>
        </ScrollReveal>
      </section>

    </>
  )
}

export default HomePage