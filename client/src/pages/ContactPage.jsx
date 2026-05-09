import PageHeader from '../components/PageHeader'

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Spojte se s námi"
        text="Napište nám nebo zavolejte. Ozveme se co nejdříve s návrhem postupu a orientační cenou."
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Kontaktní údaje</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">OpusCode</h2>
            <ul className="mt-4 space-y-3 text-slate-200">
              <li>E-mail: kontakt@opuscode.dev</li>
              <li>Vedoucí: Adam Tomala – OpusCode</li>
              <li>Telefon majitel: +420 737 911 901</li>
              <li>Telefon podpora: +420 777 123 456</li>
              <li>IČO: Comming Soon</li>
              <li>Sídlo: Spojovací 1172, 294 01 Bakov nad Jizerou</li>
              <li>Web: www.opuscode.dev</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Provozní informace</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Kdy jsme k dispozici</h2>
            <ul className="mt-4 space-y-3 text-slate-200">
              <li>Pondělí - Pátek: 8:00 - 18:00</li>
              <li>Víkend: dle domluvy</li>
              <li>Online konzultace: Google Meet / telefon</li>
            </ul>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-accent-soft bg-accent-soft p-6 text-slate-100">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Rychlý kontakt</p>
          <p className="mt-3">
            Pro objednávku konkrétního plánu klikněte na tlačítko <strong>Nezávazně objednat</strong> u vybraného
            plánu. Otevře se formulář a po odeslání vám přijde potvrzení do e-mailu.
          </p>
        </div>
      </section>
    </>
  )
}

export default ContactPage
