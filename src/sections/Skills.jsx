import { Database, FileJson } from 'lucide-react'
import { SKILL_GROUPS } from '../data/skills'
import Section from '../components/Section.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'
import LogoLoop from '../components/LogoLoop.jsx'
import { TECH } from '../data/tech'
import useMediaQuery from '../hooks/useMediaQuery.js'

// Icônes des technologies sans logo de marque (SQL, NoSQL : voir `icon` dans data/tech.js).
const ICONS = { Database, FileJson }

// Un logo du carrousel : l'image (blanche si le logo d'origine est noir), ou l'icône, ou l'initiale ; le nom est
// affiché dessous par LogoLoop (`labels="below"`).
function logoOf(name) {
  const tech = TECH[name]
  const Icon = tech?.icon ? ICONS[tech.icon] : null
  const node = tech?.logo ? (
    <img src={tech.logo} alt="" draggable={false} className={`h-full w-auto max-w-none object-contain ${tech.invert ? 'brightness-0 invert' : ''}`} />
  ) : Icon ? (
    <Icon strokeWidth={1.25} aria-hidden="true" className="text-bright" style={{ height: 'var(--logoloop-logoHeight)', width: 'var(--logoloop-logoHeight)' }} />
  ) : (
    <span className="font-anton text-3xl">{name[0]}</span>
  )
  return { node, title: name, ariaLabel: name }
}

// Deux rangées qui défilent en sens inverse : le web (front et back), puis le reste (données, infra, outils, IA).
const logosOf = (...names) => SKILL_GROUPS.filter((g) => names.includes(g.label)).flatMap((g) => g.items).map(logoOf)
const ROW_A = logosOf('Front', 'Back')
const ROW_B = logosOf('Bases de données', 'Infra', 'Aussi', 'IA')

// Compétences : carrousel de logos (React Bits « Logo Loop »), qui tourne tout seul, se fait glisser et se met en
// pause au survol. La liste est dans data/skills.js.
function Skills() {
  const phone = useMediaQuery('(max-width: 639px)')
  const props = { logoHeight: phone ? 36 : 52, gap: phone ? 44 : 72, labels: 'below', fadeOut: true, fadeOutWidth: 0.1, speed: 70, pauseOnHover: true, scaleOnHover: true }
  return (
    <Section id="skills">
      <SectionTitle kicker="Compétences" poke="mewtwo" level={3}>Compétences</SectionTitle>
      <Reveal className="space-y-4 border-y border-line py-6 md:space-y-6 md:py-8">
        <LogoLoop {...props} logos={ROW_A} direction="left" ariaLabel="Compétences web : front et back" />
        <LogoLoop {...props} logos={ROW_B} direction="right" ariaLabel="Compétences : bases de données, infra, outils et IA" />
      </Reveal>
    </Section>
  )
}

export default Skills
