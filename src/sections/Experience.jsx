import { useState } from 'react'
import { PARCOURS } from '../data/parcours'
import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import Stack from '../components/Stack.jsx'
import TechList from '../components/TechList.jsx'
import { ArrowUpRight } from '../components/Icons.jsx'

const EXPERIENCES = PARCOURS.filter((step) => step.kind === 'Expérience')
const pad = (n) => String(n).padStart(2, '0')

// Une carte de la pile : logo, poste, missions et technologies. Fond noir et filet blanc :
// les cartes se superposent sans transparence.
function ExperienceCard({ exp }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/60 bg-[var(--bg)] p-6 sm:p-8">
      <div className="flex h-12 items-center justify-between gap-4">
        <img src={exp.logo} alt={exp.place} loading="lazy" decoding="async" draggable={false} className={exp.logoWide ? 'h-9 w-auto min-w-0 max-w-[55%] object-contain object-left' : 'h-12 w-12 shrink-0 rounded-xl'} />
        <p className="t-data shrink-0 text-right">
          {exp.years}
          {exp.meta && <span className="block">{exp.meta}</span>}
        </p>
      </div>

      <h3 className="mt-5 text-[clamp(1.5rem,min(2.4vw,4vh),2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em]">{exp.title}</h3>
      {/* Le lien ne lance pas le glissé de la carte */}
      <a href={exp.href} target="_blank" rel="noreferrer" onPointerDown={(e) => e.stopPropagation()} className="link self-start">
        {exp.place}
        <ArrowUpRight size={14} />
      </a>

      <ul className="t-small mt-4 space-y-1.5">
        {exp.points.slice(0, 3).map((point, i) => (
          <li key={point} className={`flex gap-3 ${i > 1 ? 'hidden sm:flex' : ''}`}>
            <span aria-hidden="true">—</span>
            {point}
          </li>
        ))}
      </ul>

      <TechList names={exp.stack} className="mt-auto pt-4" />
    </div>
  )
}

// Les expériences en pile de cartes (React Bits « Stack ») : on fait glisser ou on touche la carte
// du dessus pour voir la suivante ; la pile tourne aussi toute seule.
function Experience() {
  const [active, setActive] = useState(0)
  const current = EXPERIENCES[active]

  return (
    <SlideFrame title="Expérience">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.1} className="lg:col-span-4">
          <p className="font-anton text-[clamp(3.5rem,9vw,7rem)] leading-none tracking-[0.01em]">
            {pad(active + 1)}
            <span className="t-data ml-3 align-top">/ {pad(EXPERIENCES.length)}</span>
          </p>
          <p className="t-heading mt-4">{current.place}</p>
          <p className="t-data mt-6 hidden lg:block">Touche ou fais glisser la carte</p>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-7 lg:col-start-6">
          {/* La taille vient du conteneur : Stack remplit 100 % de sa largeur et de sa hauteur */}
          <div className="mx-auto h-[clamp(25rem,62vh,30rem)] w-full max-w-[36rem]">
            <Stack
              cards={EXPERIENCES.map((exp) => (
                <ExperienceCard key={exp.place} exp={exp} />
              ))}
              layout="fan"
              visible={EXPERIENCES.length}
              spread={0.6}
              radius={24}
              shadow={false}
              sendToBackOnClick
              autoplay
              autoplayDelay={5500}
              pauseOnHover={false}
              onChange={setActive}
            />
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}

export default Experience
