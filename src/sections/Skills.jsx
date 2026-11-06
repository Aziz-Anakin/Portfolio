import { useMemo } from 'react'
import { SKILLS } from '../data/skills'
import { PROFILE } from '../data/profile'
import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import LogoLoop from '../components/LogoLoop.jsx'

// Trois rangées qui défilent (React Bits « Logo Loop »), en sens alterné.
// Le survol ne les arrête pas ; un clic fige une rangée, un second la relance.
// La stack principale (data/profile.js) est mise en avant ; le reste défile en dessous.
const MAIN = SKILLS.dev.filter((s) => PROFILE.mainStack.includes(s.name))
const ROWS = [
  { label: 'Développement', items: SKILLS.dev.filter((s) => !PROFILE.mainStack.includes(s.name)), direction: 'left' },
  { label: 'Outils', items: SKILLS.tools, direction: 'right' },
]
// Petits groupes, fixes : leur nombre ne justifie pas un défilement.
const GROUPS = [
  { label: 'Avec l’IA', items: SKILLS.ai },
  { label: 'Création', items: SKILLS.creation },
]

// Fondu des bords : les logos apparaissent et disparaissent sans coupure nette.
const EDGE_FADE = '[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]'

function SkillItem({ skill }) {
  return (
    <a href={skill.href} target="_blank" rel="noreferrer noopener" aria-label={skill.name} className="group flex flex-col items-center gap-3 px-2 py-1">
      <img
        src={skill.logo}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`h-10 w-10 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1 ${skill.invert ? 'brightness-0 invert' : ''}`}
      />
      <span className="t-data whitespace-nowrap">{skill.name}</span>
    </a>
  )
}

function Row({ row, index }) {
  // LogoLoop mesure une séquence avant de la dupliquer : la référence doit rester stable.
  const logos = useMemo(() => row.items, [row.items])

  return (
    <Reveal delay={0.08 + index * 0.08}>
      <h3 className="t-heading">{row.label}</h3>
      <div className={`mt-5 ${EDGE_FADE}`}>
        <LogoLoop
          logos={logos}
          speed={48}
          direction={row.direction}
          logoHeight={40}
          gap={44}
          pauseOnHover
          ariaLabel={`Technologies : ${row.label}`}
          className="py-2"
          renderItem={(skill) => <SkillItem skill={skill} />}
        />
      </div>
    </Reveal>
  )
}

function Group({ label, items, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <h3 className="t-heading">{label}</h3>
      <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-5">
        {items.map((skill) => (
          <li key={skill.name}>
            <SkillItem skill={skill} />
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function Skills() {
  return (
    <SlideFrame title="Compétences">
      <div className="space-y-[clamp(1.25rem,4.5vh,3rem)]">
        <Group label="Stack principale" items={MAIN} />
        {ROWS.map((row, i) => (
          <Row key={row.label} row={row} index={i + 1} />
        ))}
        <div className="grid gap-x-12 gap-y-[clamp(1.25rem,4.5vh,3rem)] sm:grid-cols-[auto_1fr]">
          {GROUPS.map((g, i) => (
            <Group key={g.label} {...g} delay={0.3 + i * 0.08} />
          ))}
        </div>
      </div>
    </SlideFrame>
  )
}

export default Skills
