<<<<<<< HEAD
import PageHeader from '../components/PageHeader'
import TeamGrid from '../components/TeamGrid'

const teamMembers = [
  {
    tag: 'Owner',
    name: 'Adam Tomala - Andhyy',
    price: 'Majitel a vývojář',
   // imageUrl: 'https://api.andhyy.com/avatars/andhyy1.png',
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
    desc: 'Sekretář',
    items: ['Hi', 'Čau', 'konnichiwa'],
  },
]
=======
import { Navigate } from 'react-router-dom'
>>>>>>> 6ae52a758277f1ddc3861047c84e255393e36bdb

function AboutUs() {
  return <Navigate to="/kontakt" replace />
}

export default AboutUs