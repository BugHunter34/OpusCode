import PageHeader from '../components/PageHeader'
import TeamGrid from '../components/TeamGrid'

const teamMembers = [
  {
    tag: 'Owner',
    name: 'Andhyy Lightbringer',
    price: 'Výkonný Ředitel a vývojář',
    imageUrl: 'https://api.andhyy.com/avatars/andhyy1.png',
    desc: 'Backend',
    items: ['Email Worker', 'Discord', 'Money'],
  },
  {
    tag: 'Owner',
    name: 'Afrox26TP',
    price: 'Hlavní Designer a vývojář',
    desc: 'Frontend',
    items: ['Animace', 'Design', 'Návrhář'],
  },
  {
    tag: 'Intern',
    name: 'Lightsyy',
    price: 'manažer zakázek',
    desc: 'Cold Caller',
    items: ['Věčně je broke', 'Čau', 'Fent Bender Gold'],
  },
]

function AboutUs() {
    return (
    <>
      <PageHeader
        eyebrow="O nás"
        title="Poznejte náš tým"
        text=""
      />
      <TeamGrid members={teamMembers} category="Opus Code Team" />
    </>
    )
}

export default AboutUs