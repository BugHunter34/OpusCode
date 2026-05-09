import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation('common')

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center px-5 sm:px-8 lg:px-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">404</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">{t('notFound.title')}</h1>
        <Link 
          to="/" 
          className="mt-5 inline-block rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 transition hover:brightness-110"
        >
          {t('buttons.backHome')}
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage