import SectionHeading from '../components/SectionHeading.jsx'
import Typewriter from '../components/Typewriter.jsx'
import mark from '../assets/marks/one-piece-emblem.svg'

const paragraphs = [
  'Étudiant en deuxième année de Bachelor Informatique à Epitech Paris, je me spécialise en conception d’applications web, Cloud et Blockchain.',
  'J’aime créer des projets, comprendre comment les choses fonctionnent et trouver des solutions à des problèmes concrets. Ma première année m’a permis d’explorer différents domaines de l’informatique et de développer ma façon de travailler à travers de nombreux projets.',
  'Curieux et motivé, je cherche constamment à apprendre et à améliorer mes compétences à travers de nouvelles expériences et de nouveaux projets.',
]

function About() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="À propos" mark={mark} />

        <Typewriter
          paragraphs={paragraphs}
          className="max-w-3xl space-y-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300"
        />
      </div>
    </section>
  )
}

export default About
