import { Calculator, Clock3, Mail, PlusCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const CATEGORY_PLAN_KEYS = {
  websites: ['simple', 'corporate', 'large'],
  webApps: ['start', 'business', 'custom'],
}

const HOSTING_PLAN_KEYS = ['start', 'basic', 'business', 'premium']
const ADDON_OPTIONS = [
  { id: 'onlineBooking', type: 'fixed', value: 990, categories: ['websites', 'webApps'], fallback: 'Online rezervace' },
  { id: 'onlinePayments', type: 'fixed', value: 2990, categories: ['websites', 'webApps'], fallback: 'Online platby' },
  { id: 'photoGallery', type: 'fixed', value: 500, categories: ['websites', 'webApps'], fallback: 'Galerie fotek' },
  { id: 'blogCms', type: 'fixed', value: 1990, categories: ['websites', 'webApps'], fallback: 'Blog (CMS)' },
  { id: 'multilang', type: 'percent', value: 30, categories: ['websites', 'webApps'], fallback: 'Vícejazyčná verze' },
  { id: 'emailMarketing', type: 'fixed', value: 1990, categories: ['websites', 'webApps'], fallback: 'Email marketing setup' },
  { id: 'crmForms', type: 'fixed', value: 2490, categories: ['websites', 'webApps'], fallback: 'Formuláře + CRM' },
  { id: 'copywriting', type: 'fixed', value: 2990, categories: ['websites', 'webApps'], fallback: 'Copywriting textů' },
]

const INTEGRATION_OPTIONS = [
  { id: 'accounting', value: 3900, fallback: 'Účetnictví (Pohoda, Money, K2...)' },
  { id: 'warehouse', value: 4900, fallback: 'Skladový systém' },
  { id: 'shipping', value: 2900, fallback: 'Doprava (Balíkobot, Zásilkovna)' },
  { id: 'paymentGateway', value: 3490, fallback: 'Platební brány' },
  { id: 'marketingTools', value: 2990, fallback: 'Marketingové nástroje' },
  { id: 'erpCrm', value: 5900, fallback: 'ERP / CRM' },
  { id: 'custom', value: 4500, fallback: 'Jiné / na míru' },
]

const parseFirstNumber = (value) => {
  if (!value) {
    return null
  }

  const match = String(value).match(/\d+/g)
  if (!match?.length) {
    return null
  }

  return Number(match.join(''))
}

const formatPrice = (value, locale) =>
  `${new Intl.NumberFormat(locale || 'cs-CZ').format(value)} Kč`

const formatAddonValue = (addon, locale) => {
  if (addon.type === 'percent') {
    return `+${addon.value} %`
  }

  return `+ ${formatPrice(addon.value, locale)}`
}

function PriceCalculatorPage() {
  const { t, i18n } = useTranslation(['calculator', 'plans'])
  const [category, setCategory] = useState('websites')
  const [solution, setSolution] = useState('simple')
  const [hosting, setHosting] = useState('own')
  const [pagesCount, setPagesCount] = useState(1)
  const [selectedAddons, setSelectedAddons] = useState({})
  const [selectedIntegrations, setSelectedIntegrations] = useState({})

  const plans = useMemo(() => {
    const keys = CATEGORY_PLAN_KEYS[category]
    return keys.map((key) => ({
      id: key,
      ...t(`plans:${category}.plans.${key}`, { returnObjects: true }),
    }))
  }, [category, t])

  const hostingPlans = useMemo(
    () => HOSTING_PLAN_KEYS.map((key) => ({
      id: key,
      ...t(`plans:hosting.plans.${key}`, { returnObjects: true }),
    })),
    [t],
  )

  const selectedPlan = plans.find((plan) => plan.id === solution) || plans[0]
  const selectedHostingPlan = hosting === 'own' ? null : hostingPlans.find((plan) => plan.id === hosting)
  const selectedPlanItems = selectedPlan?.items || []
  const availableAddons = useMemo(
    () => ADDON_OPTIONS.filter((addon) => addon.categories.includes(category)),
    [category],
  )
  const selectedIntegrationLabels = INTEGRATION_OPTIONS
    .filter((integration) => selectedIntegrations[integration.id])
    .map((integration) => t(`integrations.options.${integration.id}`, { defaultValue: integration.fallback }))

  const selectedPlanPriceLabel = useMemo(() => {
    if (!selectedPlan) {
      return ''
    }

    if (category === 'websites' && selectedPlan.id === 'large') {
      return t('labels.largeWebFrom', { defaultValue: 'od 20 000 Kč' })
    }

    return selectedPlan.price
  }, [category, selectedPlan, t])

  const isLargeWebsitePlan = category === 'websites' && selectedPlan?.id === 'large'

  const basePrice = category === 'websites' && selectedPlan?.id === 'large'
    ? 20000
    : parseFirstNumber(selectedPlan?.price)
  const pagePrice = parseFirstNumber(selectedPlanItems.find((item) => String(item).includes('/')))
  const includedPages = parseFirstNumber(selectedPlanItems.find((item) => /do\s*\d+/i.test(String(item))))
  const extraPages = Number.isFinite(includedPages) ? Math.max(0, pagesCount - includedPages) : 0
  const pagesPrice = pagePrice ? extraPages * pagePrice : 0
  const fixedAddonsPrice = availableAddons.reduce(
    (sum, addon) => (selectedAddons[addon.id] && addon.type === 'fixed' ? sum + addon.value : sum),
    0,
  )
  const subtotalBeforePercentAddons = (basePrice || 0) + pagesPrice + fixedAddonsPrice
  const percentAddonsPrice = availableAddons.reduce(
    (sum, addon) => (selectedAddons[addon.id] && addon.type === 'percent' ? sum + Math.round((subtotalBeforePercentAddons * addon.value) / 100) : sum),
    0,
  )
  const addonsPrice = fixedAddonsPrice + percentAddonsPrice
  const integrationsPrice = INTEGRATION_OPTIONS.reduce(
    (sum, integration) => (selectedIntegrations[integration.id] ? sum + integration.value : sum),
    0,
  )
  const totalPrice = basePrice === null ? null : basePrice + pagesPrice + addonsPrice + integrationsPrice
  const hostingMonthlyPrice = selectedHostingPlan ? parseFirstNumber(selectedHostingPlan.price) || 0 : 0
  const selectedAddonLabels = availableAddons
    .filter((addon) => selectedAddons[addon.id])
    .map((addon) => t(`addons.options.${addon.id}`, { defaultValue: addon.fallback }))
  const hostingStepTitle = `${category === 'webApps' ? '5' : '4'}) ${t('steps.hosting.label', { defaultValue: 'Jak to bude s hostingem / správou?' })}`
  const integrationsStepTitle = `4) ${t('steps.integrations.label', { defaultValue: 'Integrace' })}`

  const mailBody = encodeURIComponent(
    [
      `${t('mail.category', { defaultValue: 'Kategorie' })}: ${category === 'websites' ? t('categories.websites', { defaultValue: 'Weby' }) : t('categories.webApps', { defaultValue: 'Webové aplikace' })}`,
      `${t('mail.solution')}: ${selectedPlan?.name || ''}`,
      `${t('mail.pages')}: ${pagesCount}`,
      `${t('mail.addons', { defaultValue: 'Doplňky' })}: ${selectedAddonLabels.length ? selectedAddonLabels.join(', ') : t('mail.noExtras', { defaultValue: 'Bez doplňků' })}`,
      `${t('mail.integrations', { defaultValue: 'Integrace' })}: ${selectedIntegrationLabels.length ? selectedIntegrationLabels.join(', ') : t('mail.noExtras', { defaultValue: 'Bez doplňků' })}`,
      `${t('mail.hosting', { defaultValue: 'Hosting' })}: ${selectedHostingPlan ? selectedHostingPlan.name : t('hosting.own', { defaultValue: 'Vlastní hosting' })}`,
      `${t('mail.estimatedPrice')}: ${totalPrice === null ? selectedPlan?.price : formatPrice(totalPrice, i18n.language)}`,
    ].join('\n'),
  )

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-12 sm:px-8 lg:px-12">
      <div className="text-center">
        <p className="reveal inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <Calculator size={14} />
          {t('eyebrow')}
        </p>
        <h1 className="font-display reveal reveal-delay-1 mt-4 text-4xl font-semibold text-white sm:text-5xl">
          {t('title')}
        </h1>
        <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-3xl text-slate-300">{t('subtitle')}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-6">
          <article className="glass-panel reveal reveal-delay-1 rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold text-white">{t('steps.solution.title', { defaultValue: '1) Vyberte typ projektu a plán' })}</h2>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/40 p-1">
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'websites', label: t('categories.websitesCta', { defaultValue: 'CHCI NOVY WEB' }) },
                  { id: 'webApps', label: t('categories.webAppsCta', { defaultValue: 'CHCI WEBOVOU APLIKACI' }) },
                ].map((item) => {
                  const active = category === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCategory(item.id)
                        setSolution(CATEGORY_PLAN_KEYS[item.id][0])
                        setPagesCount(1)
                        setSelectedAddons({})
                        setSelectedIntegrations({})
                      }}
                      className={`rounded-xl px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] transition sm:text-sm ${
                        active
                          ? 'bg-accent text-slate-950 shadow-[0_8px_28px_rgb(var(--accent-rgb)_/_0.35)]'
                          : 'border border-white/20 text-slate-200 hover:bg-white/8'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {plans.map((plan) => {
                const id = plan.id
                const active = solution === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSolution(id)}
                    className={`flex w-full items-start justify-between rounded-xl border px-4 py-4 text-left transition ${
                      active
                        ? 'border-accent bg-accent/10 ring-1 ring-accent/40'
                        : 'border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
                    }`}
                  >
                    <div>
                      <p className="text-base font-semibold text-white">{plan.name}</p>
                      <p className="mt-1 text-sm text-slate-300">{plan.desc}</p>
                    </div>
                    <span className="ml-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                      {category === 'websites' && id === 'large' ? t('labels.largeWebFrom', { defaultValue: 'od 20 000 Kč' }) : plan.price}
                    </span>
                  </button>
                )
              })}
            </div>
          </article>

          <article className="glass-panel reveal reveal-delay-2 rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold text-white">{t('steps.pages.title', { defaultValue: '2) Kolik bude mít projekt stránek/sekcí?' })}</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label htmlFor="pages" className="text-sm text-slate-300">
                {t('steps.pages.label', { defaultValue: 'Počet stránek/sekcí:' })}
              </label>
              <input
                id="pages"
                type="number"
                min={1}
                max={100}
                value={pagesCount}
                onChange={(event) => {
                  const numericValue = Number(event.target.value)
                  if (!Number.isNaN(numericValue)) {
                    setPagesCount(Math.max(1, Math.min(100, numericValue)))
                  }
                }}
                className="w-20 rounded-md border border-white/15 bg-slate-950/60 px-3 py-2 text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-sm text-slate-300">
                {basePrice === null ? t('summary.disclaimer') : t('steps.pages.note', { defaultValue: 'Příplatek se počítá podle vybraného plánu.' })}
              </p>
            </div>
          </article>

          <article className="glass-panel reveal reveal-delay-3 rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold text-white">{t('steps.addons.title', { defaultValue: '3) Doplňkové funkce' })}</h2>
            <p className="mt-1 text-sm text-slate-300">{t('steps.addons.note', { defaultValue: '(klepněte na ty které potřebujete)' })}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {availableAddons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 transition hover:border-white/20"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(selectedAddons[addon.id])}
                    onChange={(event) =>
                      setSelectedAddons((prev) => ({
                        ...prev,
                        [addon.id]: event.target.checked,
                      }))
                    }
                    className="mt-1 h-4 w-4 rounded border-white/25 bg-slate-950 text-accent"
                  />
                  <span>
                    <span className="text-sm font-semibold text-white">
                      {t(`addons.options.${addon.id}`, { defaultValue: addon.fallback })}
                    </span>
                    <span className="block text-xs text-slate-300">{formatAddonValue(addon, i18n.language)}</span>
                  </span>
                </label>
              ))}
            </div>
          </article>

          {category === 'webApps' ? (
            <article className="glass-panel reveal reveal-delay-4 rounded-2xl p-6">
              <h2 className="font-display text-2xl font-semibold text-white">{integrationsStepTitle}</h2>
              <p className="mt-1 text-sm text-slate-300">{t('steps.integrations.note', { defaultValue: '(vyberte vše, co potřebujete)' })}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {INTEGRATION_OPTIONS.map((integration) => {
                  const active = Boolean(selectedIntegrations[integration.id])
                  return (
                    <button
                      key={integration.id}
                      type="button"
                      onClick={() =>
                        setSelectedIntegrations((prev) => ({
                          ...prev,
                          [integration.id]: !prev[integration.id],
                        }))
                      }
                      className={`rounded-xl border px-4 py-4 text-left transition ${
                        active
                          ? 'border-accent bg-accent/10 ring-1 ring-accent/40'
                          : 'border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-white">
                          {t(`integrations.options.${integration.id}`, { defaultValue: integration.fallback })}
                        </p>
                        <span className="whitespace-nowrap text-xs font-semibold text-slate-300">
                          + {formatPrice(integration.value, i18n.language)}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </article>
          ) : null}

          <article className="glass-panel reveal reveal-delay-4 rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold text-white">{hostingStepTitle}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setHosting('own')}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  hosting === 'own'
                    ? 'border-accent bg-accent/10 ring-1 ring-accent/40'
                    : 'border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                <p className="text-base font-semibold text-white">{t('hosting.own', { defaultValue: 'Mám vlastní hosting' })}</p>
                <p className="mt-1 text-sm text-slate-300">0 Kč / měsíc</p>
              </button>

              {hostingPlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setHosting(plan.id)}
                  className={`rounded-xl border px-4 py-4 text-left transition ${
                    hosting === plan.id
                      ? 'border-accent bg-accent/10 ring-1 ring-accent/40'
                      : 'border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
                  }`}
                >
                  <p className="text-base font-semibold text-white">{plan.name}</p>
                  <p className="mt-1 text-sm text-slate-300">{plan.price}</p>
                </button>
              ))}
            </div>
          </article>
        </div>

        <div className="space-y-5 self-start md:sticky md:top-24">
          <article className="glass-panel rounded-2xl p-6">
            <p className="inline-flex items-center gap-2 text-lg font-semibold text-white">
              <Clock3 size={18} /> {t('summary.title')}
            </p>
            <p className="mt-5 text-center text-4xl font-bold text-accent">
              {totalPrice === null
                ? selectedPlan?.price
                : `${formatPrice(totalPrice, i18n.language)}${isLargeWebsitePlan ? '+' : ''}`}
            </p>
            <p className="mt-1 text-center text-sm text-slate-300">{t('summary.priceLabel')}</p>

            <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <span>{t('summary.base')}</span>
                <span>{selectedPlanPriceLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t('summary.pages')}</span>
                <span>{formatPrice(pagesPrice, i18n.language)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t('summary.extras', { defaultValue: 'Doplňky' })}</span>
                <span>{formatPrice(addonsPrice, i18n.language)}</span>
              </div>
              {category === 'webApps' ? (
                <div className="flex items-center justify-between">
                  <span>{t('summary.integrations', { defaultValue: 'Integrace' })}</span>
                  <span>{formatPrice(integrationsPrice, i18n.language)}</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between">
                <span>{t('summary.hosting', { defaultValue: 'Hosting (měsíčně)' })}</span>
                <span>{selectedHostingPlan ? selectedHostingPlan.price : '0 Kč / měsíc'}</span>
              </div>
            </div>

            {hostingMonthlyPrice > 0 ? (
              <p className="mt-3 text-xs text-slate-400">
                {t('summary.hostingHint', { defaultValue: 'Hosting je měsíční platba navíc k realizaci.' })}
              </p>
            ) : null}

            <a
              href={`mailto:kontakt@opuscode.dev?subject=${encodeURIComponent(t('mail.subject'))}&body=${mailBody}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-95"
            >
              <Mail size={16} />
              {t('summary.send')}
            </a>

            <p className="mt-4 text-xs text-slate-400">{t('summary.disclaimer')}</p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <p className="inline-flex items-center gap-2 text-lg font-semibold text-white">
              {t('included.title')}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {selectedPlanItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <PlusCircle size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export default PriceCalculatorPage
