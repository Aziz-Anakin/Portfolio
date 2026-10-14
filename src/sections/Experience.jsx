import { PARCOURS } from '../data/parcours'
import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import TechList from '../components/TechList.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'

const EXPERIENCES = PARCOURS.filter((step) => step.kind === 'Expérience')

// Une carte par stage : logo de l'entreprise, poste, missions et technologies.
// Un halo suit le curseur (React Bits « Spotlight Card »).
function ExperienceCard({ exp }) {
  return (
    <SpotlightCard className="flex h-full flex-col p-2 sm:p-8">
      <div className="flex h-14 items-center justify-between gap-4">
        <img src={exp.logo} alt={exp.place} loading="lazy" decoding="async" draggable={false} className={exp.logoWide ? 'h-10 w-auto' : 'h-14 w-14 rounded-xl'} />
        <p className="t-label shrink-0">{exp.years}</p>
      </div>

      <h3 className="mt-6 text-[clamp(1.5rem,min(2.4vw,4vh),2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em]">{exp.title}</h3>
      <a href={exp.href} target="_blank" rel="noreferrer" className="link self-start">
        {exp.place}
        <ArrowUpRight size={14} />
      </a>

      <ul className="t-small mt-3 space-y-1.5">
        {exp.points.slice(0, 3).map((point, i) => (
          <li key={point} className={`flex gap-3 ${i > 1 ? 'hidden sm:flex' : ''}`}>
            <span aria-hidden="true">—</span>
            {point}
          </li>
        ))}
      </ul>

      <TechList names={exp.stack} className="mt-auto pt-6" />
    </SpotlightCard>
  )
}

function Experience() {
  return (
    <SlideFrame title="Expérience">
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
        {EXPERIENCES.map((exp, i) => (
          <Reveal key={exp.place} delay={0.1 + i * 0.1}>
            <ExperienceCard exp={exp} />
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}

export default Experience
