import SectionHeading from '../components/SectionHeading.jsx'
import Typewriter from '../components/Typewriter.jsx'
import mark from '../assets/marks/one-piece-emblem.svg'

const paragraphs = [
  'Étudiant en informatique à Epitech Paris, je suis passionné par le développement web et les nouvelles technologies.',
  "Je prépare un Bachelor délivrant un titre RNCP de niveau 6, et me forme à travers une pédagogie innovante basée sur le travail par projets. En première année, j'explore différents domaines tels que le développement web, la cybersécurité, le DevOps, l'intelligence artificielle, la data ainsi que le business.",
  "J'aime créer des applications web, comprendre le fonctionnement des systèmes informatiques et résoudre des problématiques concrètes. J'ai également acquis de l'expérience en assistance utilisateurs, maintenance de PC et gestion de parc informatique grâce à mes stages.",
  "Curieux et motivé, j'apprends continuellement de nouvelles technologies et cherche à progresser chaque jour. Mon objectif est de renforcer mes compétences tout en apportant des solutions utiles, efficaces et innovantes.",
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
