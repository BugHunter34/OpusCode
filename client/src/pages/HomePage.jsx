import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 pb-10 pt-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <article>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{t('hero.tag')}</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-5 max-w-2xl text-slate-300 sm:text-lg">
            {t('hero.subtitle')}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/weby"
              className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {t('hero.btnWeb')}
            </Link>
            <Link to="/web-aplikace" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10">
              {t('hero.btnApp')}
            </Link>
          </div>
        </article>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t('basicInfo.title')}</p>
          <ul className="mt-4 space-y-3 text-slate-200">
            <li className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">{t('basicInfo.item1')}</li>
            <li className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">{t('basicInfo.item2')}</li>
            <li className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">{t('basicInfo.item3')}</li>
            <li className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">{t('basicInfo.item4')}</li>
          </ul>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t('collaboration.title')}</h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            {t('collaboration.subtitle')}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-slate-200">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(`collaboration.step${num}.title`)}</p>
                <p className="mt-2">{t(`collaboration.step${num}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{t('portfolio.title')}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {portfolio.map((project) => (
            <article key={project.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
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
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-accent-soft bg-accent-soft p-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">{t('order.title')}</p>
          <p className="mt-3 text-slate-100">
            {t('order.text')} <Link className="text-accent-soft underline hover:text-white transition" to="/weby">{t('common:nav.websites')}</Link>,{' '}
            <Link className="text-accent-soft underline hover:text-white transition" to="/hosting">{t('common:nav.hosting')}</Link>,{' '}
            <Link className="text-accent-soft underline hover:text-white transition" to="/web-aplikace">{t('common:nav.webApps')}</Link>,{' '}
            <Link className="text-accent-soft underline hover:text-white transition" to="/kurzy">{t('common:nav.courses')}</Link>,{' '}
            <Link className="text-accent-soft underline hover:text-white transition" to="/jine">{t('common:nav.other')}</Link>.{' '}
            <Link className="text-accent-soft underline hover:text-white transition" to="/test">{t('common:nav.test')}</Link>.
          </p>
        </div>
      </section>
    </>
  )
}

export default HomePage