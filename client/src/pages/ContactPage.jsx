import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import TeamGrid from '../components/TeamGrid'
import useLowEndDevice from '../hooks/useLowEndDevice'

function ContactPage() {
  const { t } = useTranslation(['contact', 'team'])
  const isLowEndDevice = useLowEndDevice()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const teamMembers = [
    {
      tag: t('team:tags.owner'),
      name: 'Adam Tomala',
      role: `${t('team:roles.Lead')} ${t('team:roles.Backend')}`,
      desc: t('team:desc.backend'),
      items: [t('team:items.DB'), 'API', t('team:items.structure')],
    },
    {
      tag: t('team:tags.owner'),
      name: 'Tomáš Pýcha',
      role: `${t('team:roles.Lead')} ${t('team:roles.Frontend')}`,
      desc: t('team:desc.frontend'),
      items: [t('team:items.animation'), t('team:items.design'), t('team:items.designer')],
    },
    {
      tag: t('team:tags.intern'),
      name: 'Samuel Morávek',
      role: `${t('team:roles.Lead')} ${t('team:roles.Communication')}`,
      desc: t('team:desc.secretary'),
      items: ['Tester', 'Cold caller', t('team:items.clientFW')],
    },
    {
      tag: t('team:tags.intern'),
      name: `Kamil Komoond ${t('team:items.PolishMilk')}`,
      role: `${t('team:items.translator')}`,
      desc: t(''),
      imageUrl: 'https://api.andhyy.com/avatars/PolishMilk.jpg',
      items: ['Tester', `${t('team:items.Polish')} ${t('team:items.translator')}`],
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow={t('contact:eyebrow')}
        title={t('contact:title')}
        text={t('contact:text')}
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="glass-panel reveal reveal-delay-1 rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('contact:details.eyebrow')}
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-white">OpusCode</h2>
            <ul className="mt-4 space-y-3 text-slate-200">
              <li>{t('contact:details.email')}: kontakt@opuscode.dev</li>
              <li>{t('contact:details.lead')}: Adam Tomala</li>
              <li>{t('contact:details.ownerPhone')}: +420 737 911 901</li>
              <li>{t('contact:details.supportPhone')}: +420 777 123 456</li>
              <li>{t('contact:details.supportPhone')}: +420 603 742 942</li>
              <li>{t('contact:details.id')}: 29547288</li>
              <li>{t('contact:details.address')}: Spojovací 1172, 294 01 Bakov nad Jizerou</li>
              <li>{t('contact:details.website')}: www.opuscode.dev</li>
            </ul>
          </article>

          <article className="glass-panel reveal reveal-delay-2 rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('contact:operating.eyebrow')}
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold text-white">
              {t('contact:operating.title')}
            </h2>
            <ul className="mt-4 space-y-3 text-slate-200">
              <li>{t('contact:operating.week')}</li>
              <li>{t('contact:operating.weekend')}</li>
              <li>{t('contact:operating.consult')}</li>
            </ul>
          </article>
        </div>

        <div className="reveal reveal-delay-3 mt-6 rounded-2xl border border-accent-soft bg-accent-soft p-6 text-slate-100">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
            {t('contact:quick.eyebrow')}
          </p>
          <p className="mt-3">
            {t('contact:quick.text1')} <strong>{t('contact:quick.strong')}</strong>{t('contact:quick.text2')}
          </p>
        </div>

        <article
          className={`glass-panel reveal reveal-delay-4 mt-6 rounded-2xl p-4 sm:p-6 ${!isLowEndDevice ? 'map-card' : ''}`}
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t('contact:map.eyebrow')}
              </p>
              <h2 className="font-display mt-2 text-2xl font-semibold text-white">
                {t('contact:map.title')}
              </h2>
              <p className="mt-2 text-slate-300">{t('contact:map.text')}</p>
            </div>

            <a
              href="https://maps.google.com/?q=Spojovaci+1172%2C+Bakov+nad+Jizerou"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-accent-soft px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-accent-soft"
            >
              {t('contact:map.open')}
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/50">
            <iframe
              title="OpusCode location map"
              src="https://www.google.com/maps?q=Spojovaci+1172%2C+Bakov+nad+Jizerou&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[320px] w-full border-0 sm:h-[380px]"
            />
          </div>
        </article>
      </section>

      <TeamGrid members={teamMembers} category={t('contact:teamCategory')} />
    </>
  )
}

export default ContactPage