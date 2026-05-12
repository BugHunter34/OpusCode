import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'

function ToS() {
  const { t } = useTranslation('tos')

  const renderTextSection = (sectionKey) => (
    <div className="mt-8 reveal reveal-delay-1">
      <h2 className="font-display text-xl font-semibold text-white">{t(`${sectionKey}.title`)}</h2>
      <p className="mt-3 text-slate-300 whitespace-pre-line">{t(`${sectionKey}.text`)}</p>
    </div>
  )

  const renderListSection = (sectionKey) => {
    const intro = t(`${sectionKey}.intro`, { defaultValue: '' })
    const items = t(`${sectionKey}.items`, { returnObjects: true }) || []

    return (
      <div className="mt-8 reveal reveal-delay-2">
        <h2 className="font-display text-xl font-semibold text-white">{t(`${sectionKey}.title`)}</h2>
        {intro && <p className="mt-3 text-slate-300">{intro}</p>}
        
        <ul className="mt-4 space-y-3 text-slate-300">
          {Array.isArray(items) && items.map((item, index) => (
            <li key={index} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              {item.title && <strong className="text-white font-semibold mr-2">{item.title}</strong>}
              <span>{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>

      <PageHeader />

      <section className="mx-auto w-full max-w-4xl px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        <div className="glass-panel reveal rounded-3xl p-7 sm:p-10">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <h1 className="font-display text-3xl font-semibold text-white sm:text-5xl">{t('title')}</h1>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mt-4">
              {t('lastUpdated')}
            </p>
            <p className="mt-5 text-slate-300 sm:text-lg">
              {t('intro')}
            </p>
          </div>

          {/* Sections */}
          {renderTextSection('section1')}
          {renderTextSection('section2')}
          {renderListSection('section3')}
          {renderListSection('section4')}
          {renderListSection('section5')}
          {renderListSection('section6')}
          {renderListSection('section7')}
          {renderTextSection('section8')}
          {renderListSection('section9')}
          {renderTextSection('section10')}
          {renderTextSection('section11')}
          {renderListSection('section12')}
          {renderTextSection('section13')}
          {renderListSection('section14')}
          {renderListSection('section15')}
          {renderTextSection('section16')}

        </div>

        {/* Disclaimer */}
        <div className="reveal reveal-delay-3 mt-8 rounded-3xl border border-accent-soft bg-accent-soft/10 p-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
            {t('disclaimer.title')}
          </p>
          <p className="mt-3 text-slate-300 text-sm">
            {t('disclaimer.text')}
          </p>
        </div>
        
      </section>
    </>
  )
}

export default ToS;