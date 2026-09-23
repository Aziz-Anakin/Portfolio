import { useMemo } from 'react'
import { SKILLS } from '../data/skills'
import SectionHeading from '../components/SectionHeading.jsx'
import LogoLoop from '../components/LogoLoop.jsx'
import mark from '../assets/marks/one-piece-3.svg'

// Vitesse commune aux trois rangées, en pixels par seconde.
const SPEED = 52
// Écart entre deux logos, resserré sur mobile.
const GAP = 40

const ROWS = [
  { label: 'Développement', key: 'dev', direction: 'left' },
  { label: 'Outils', key: 'tools', direction: 'right' },
  { label: 'Création', key: 'creation', direction: 'left' },
]

function SkillItem({ skill }) {
  return (
    <a
      href={skill.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={skill.name}
      className="group flex flex-col items-center gap-2.5 rounded-lg px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <img
        src={skill.logo}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`skill-logo h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110 ${
          skill.invert ? 'dark:invert' : ''
        }`}
      />
      <span className="text-xs font-medium whitespace-nowrap text-slate-500 dark:text-slate-400">
        {skill.name}
      </span>
    </a>
  )
}

function SkillsRow({ label, items, direction }) {
  // LogoLoop mesure une séquence avant de la dupliquer: la référence doit rester stable.
  const logos = useMemo(() => items, [items])

  return (
    <div>
      <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500">
        {label}
      </p>
      <LogoLoop
        logos={logos}
        speed={SPEED}
        direction={direction}
        logoHeight={40}
        gap={GAP}
        pauseOnHover
        fadeOut
        ariaLabel={`Technologies: ${label}`}
        className="py-3"
        renderItem={(skill) => <SkillItem skill={skill} />}
      />
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="reveal bg-white py-20 sm:py-24 dark:bg-slate-950" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Compétences" mark={mark} />

        <div className="space-y-10">
          {ROWS.map((row) => (
            <SkillsRow
              key={row.key}
              label={row.label}
              items={SKILLS[row.key]}
              direction={row.direction}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
