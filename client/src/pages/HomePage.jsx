import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { Code2, Gauge, GraduationCap, LayoutTemplate, Mail, Map, Rocket, ScrollText, Search, ServerCog } from 'lucide-react'

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
  const { t } = useTranslation('home')

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

  const stepIcons = [Search, Map, Rocket, Gauge, ScrollText, Search]

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

    </>
  )
}

export default HomePage