import { useMemo, useState } from 'react'

const API_BASE_URL = "https://api.opuscode.dev"

const getInitialForm = () => ({
  fullName: '',
  email: '',
  phone: '',
  company: '',
  note: '',
  gdprConsent: false,
})

function PlanGrid({ plans, category = 'Nezařazené' }) {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState(getInitialForm)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = useMemo(() => {
    return formData.fullName.trim() && formData.email.trim() && formData.gdprConsent
  }, [formData])

  const closeForm = () => {
    setSelectedPlan(null)
    setFormData(getInitialForm())
    setStatus({ type: 'idle', message: '' })
    setIsSubmitting(false)
  }

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedPlan) {
      return
    }

    if (!canSubmit) {
      setStatus({ type: 'error', message: 'Vyplňte prosím jméno, e-mail a souhlas se zpracováním údajů.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          planName: selectedPlan.name,
          planPrice: selectedPlan.price,
          ...formData,
        }),
      })

      const responseData = await response.json()

      // if 400-500
      if (!response.ok) {
        throw new Error(responseData.detail || 'Nepodařilo se odeslat objednávku. Zkuste to prosím znovu.')
      }

      setStatus({
        type: 'success',
        message: responseData.message || 'Objednávka byla úspěšně odeslána. Potvrzení jsme poslali na váš e-mail.',
      })
      // clear form
      setFormData(getInitialForm())
      
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Nastala chyba při odeslání formuláře.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="flex h-full min-h-[430px] flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[color:var(--accent)]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{plan.tag}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{plan.name}</h2>
            <p className="mt-1 text-3xl font-bold text-accent-soft">{plan.price}</p>
            <p className="mt-3 text-sm text-slate-300">{plan.desc}</p>

            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-200">
              {plan.items.map((item) => (
                <li key={item} className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setSelectedPlan(plan)}
              className="mt-5 w-full rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 transition hover:brightness-110"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Nezávazně objednat
            </button>
          </article>
        ))}
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Objednávkový formulář</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{selectedPlan.name}</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Kategorie: {category} | Cena: {selectedPlan.price}
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-white/20 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
              >
                Zavřít
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Jméno a příjmení *
                  <input
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFieldChange}
                    className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-[color:var(--accent)]"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  E-mail *
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFieldChange}
                    className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-[color:var(--accent)]"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Telefon
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFieldChange}
                    className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-[color:var(--accent)]"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Firma
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleFieldChange}
                    className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-[color:var(--accent)]"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-slate-200">
                Poznámka k objednávce
                <textarea
                  name="note"
                  rows={4}
                  value={formData.note}
                  onChange={handleFieldChange}
                  className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-[color:var(--accent)]"
                  placeholder="Stručně popište, co potřebujete."
                />
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-200">
                <input
                  name="gdprConsent"
                  type="checkbox"
                  checked={formData.gdprConsent}
                  onChange={handleFieldChange}
                  className="mt-1"
                />
                <span>Souhlasím se zpracováním kontaktních údajů za účelem vyřízení objednávky. *</span>
              </label>

              {status.message && (
                <p className={`text-sm ${status.type === 'success' ? 'text-lime-300' : 'text-rose-300'}`}>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || !canSubmit}
                className="w-full rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {isSubmitting ? 'Odesílám...' : 'Odeslat objednávku'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default PlanGrid

