import PageHeader from '../components/PageHeader'
import PlanGrid from '../components/PlanGrid'

const plans = [
  {
    tag: 'Základ',
    name: 'Hosting Start',
    price: '40 Kc / měsíc',
    desc: 'Jasný základ pro menší web. Bez složitostí.',
    items: ['1 web', 'Úložiště 2.5 GB', '2 e-mailových schránek', 'Naše domény', 'SSL certifikát'],
  },
  {
    tag: 'Budget',
    name: 'Hosting Basic',
    price: '140 Kc / měsíc',
    desc: 'když chcete něco víc',
    items: ['1 web', 'Úložiště 25 GB', '10 e-mailových schránek','Vlastní doména', 'SSL certifikát'],
  },
  {
    tag: 'Oblíbené',
    name: 'Hosting Business',
    price: '370 Kc / měsíc',
    desc: 'Nejlepší volba pro běžný firemní web.',
    items: ['1 web + 1 testovací verze', 'Úložiště 50 GB', '20 e-mailových schránek', 'vlastní doména', 'Denní zálohování v ceně', 'SSL certifikát'],
  },
  {
    tag: 'Na míru',
    name: 'Hosting Premium',
    price: 'od 500 Kc / měsíc',
    desc: 'Pro větší projekty a více webů.',
    items: ['Až 3 weby', 'Úložiště 100 GB', '50 e-mailových schránek', 'vlastní doména', 'Denní zálohování v ceně', 'SSL certifikát'],
  },

]

function HostingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hosting Solutions 24/7"
        title="Hosting, který se vám vyplatí"
        text="Přesně víte, co dostanete za cenu. Žádná technická omáčka, jen jasné limity a podpora."
      />
      <PlanGrid plans={plans} category="Hosting" />
    </>
  )
}

export default HostingPage
