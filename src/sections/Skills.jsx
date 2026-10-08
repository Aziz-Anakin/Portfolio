import { useMemo } from 'react'
import { SKILLS } from '../data/skills'
import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import LogoLoop from '../components/LogoLoop.jsx'

// Trois rangées qui défilent (React Bits « Logo Loop »), en sens alterné.
// Le survol ne les arrête pas ; un clic fige une rangée, un second la relance.
const ROWS = [
  { label: 'Développement', items: SKILLS.dev, direction: 'left' },
  { label: 'Outils', items: SKILLS.tools, direction: 'right' },
  { label: 'Création', items: SKILLS.creation, direction: 'left' },
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
        className={`h-12 w-12 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1 ${skill.invert ? 'brightness-0 invert' : ''}`}
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
      <div className="container-page">
        <h3 className="t-heading">{row.label}</h3>
      </div>
      <div className={`mt-5 ${EDGE_FADE}`}>
        <LogoLoop
          logos={logos}
          speed={48}
          direction={row.direction}
          logoHeight={48}
          gap={52}
          pauseOnHover
          ariaLabel={`Technologies : ${row.label}`}
          className="py-2"
          renderItem={(skill) => <SkillItem skill={skill} />}
        />
      </div>
    </Reveal>
  )
}

function Skills() {
  return (
    <SlideFrame title="Compétences" bleed>
      <div className="space-y-[clamp(1.25rem,4.5vh,3rem)]">
        {ROWS.map((row, i) => (
          <Row key={row.label} row={row} index={i} />
        ))}
      </div>
    </SlideFrame>
  )
}

export default Skills
