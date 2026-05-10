import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import TeamGrid from '../components/TeamGrid'

function ContactPage() {
  const { t } = useTranslation(['contact', 'team'])

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
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('contact:details.eyebrow')}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">OpusCode</h2>
            <ul className="mt-4 space-y-3 text-slate-200">
              <li>{t('contact:details.email')}: kontakt@opuscode.dev</li>
              <li>{t('contact:details.lead')}: Adam Tomala</li>
              <li>{t('contact:details.ownerPhone')}: +420 737 911 901</li>
              <li>{t('contact:details.supportPhone')}: +420 777 123 456</li>
              <li>{t('contact:details.id')}: Comming Soon</li>
              <li>{t('contact:details.address')}: Spojovací 1172, 294 01 Bakov nad Jizerou</li>
              <li>{t('contact:details.website')}: www.opuscode.dev</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t('contact:operating.eyebrow')}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {t('contact:operating.title')}
            </h2>
            <ul className="mt-4 space-y-3 text-slate-200">
              <li>{t('contact:operating.week')}</li>
              <li>{t('contact:operating.weekend')}</li>
              <li>{t('contact:operating.consult')}</li>
            </ul>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-accent-soft bg-accent-soft p-6 text-slate-100">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
            {t('contact:quick.eyebrow')}
          </p>
          <p className="mt-3">
            {t('contact:quick.text1')} <strong>{t('contact:quick.strong')}</strong>{t('contact:quick.text2')}
          </p>
        </div>
      </section>

      <TeamGrid members={teamMembers} category={t('contact:teamCategory')} />
    </>
  )
}

export default ContactPage