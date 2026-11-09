import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, BookOpen, Bug, Component, Database, FlaskConical, Gauge, Layers, LayoutTemplate, Monitor, Palette, Plug, Rocket, ShieldCheck, Sparkles } from 'lucide-react'
import { AI_SKILLS } from '../data/aiSkills'
import Section from '../components/Section.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'
import Spawn from '../components/Spawn.jsx'
import Stack from '../components/Stack.jsx'
import { CardLabel } from '../components/ui/card.jsx'

const ICONS = { BookOpen, Bug, Component, Database, FlaskConical, Gauge, Layers, LayoutTemplate, Monitor, Palette, Plug, Rocket, ShieldCheck, Sparkles }
const pad = (n) => String(n).padStart(2, '0')

// Une carte de la pile : logo de la marque (ou icône), domaine, nom, description, éditeur. Le lien n'existe que sur la
// carte du dessus (les autres sont cachées derrière : pas de lien invisible au clavier) ; il ne déclenche pas le
// glissement de la pile.
function SkillCard({ skill, isTop }) {
  const Icon = ICONS[skill.icon] ?? Sparkles
  return (
    <div className="flex h-full flex-col border border-line bg-panel p-6 sm:p-8">
      <CardLabel aside={<span className="text-white">{skill.source}</span>}>{skill.tag}</CardLabel>
      <div className="mt-5 flex h-16 w-16 shrink-0 items-center justify-center border border-line bg-ink">
        {skill.logo ? (
          <img src={skill.logo} alt="" draggable={false} className={`h-9 w-9 object-contain ${skill.invert ? 'brightness-0 invert' : ''}`} />
        ) : (
          <Icon size={32} strokeWidth={1.5} aria-hidden="true" className="text-bright" />
        )}
      </div>
      <h3 className="mt-5 font-anton text-3xl uppercase leading-tight tracking-wide">{skill.name}</h3>
      <p className="mt-3 text-sm leading-relaxed">{skill.text}</p>
      {isTop && (
        <a
          href={skill.href}
          target="_blank"
          rel="noreferrer"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-xs uppercase tracking-widest text-bright hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright"
        >
          Voir le skill <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      )}
    </div>
  )
}

// Skills pour agents IA et serveurs MCP utiles à un développeur full-stack, en pile de cartes (React Bits « Stack », comme
// la formation) : on touche ou on fait glisser la carte du dessus. Le compteur à gauche suit la carte du dessus.
function AiSkills() {
  const [top, setTop] = useState(0)
  const current = AI_SKILLS[top]

  return (
    <Section id="ai-skills">
      <SectionTitle kicker="Skills IA" poke="kyurem" level={4}>Skills IA</SectionTitle>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <p className="font-anton text-[clamp(3.5rem,9vw,7rem)] leading-none tracking-wide">
            <motion.span key={top} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-block">
              {pad(top + 1)}
            </motion.span>
            <span className="ml-3 align-top font-mono text-xs tracking-widest">/ {pad(AI_SKILLS.length)}</span>
          </p>
          <motion.p key={current.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-xl font-semibold leading-snug">
            {current.name}
          </motion.p>
          <p className="mt-6 hidden font-mono text-xs uppercase tracking-widest lg:block">Touche ou fais glisser la carte</p>
        </Reveal>

        <Spawn delay={0.1} className="lg:col-span-7 lg:col-start-6">
          {/* La taille vient du conteneur : Stack remplit 100 % de sa largeur et de sa hauteur */}
          <div className="mx-auto h-[clamp(21rem,52vh,25rem)] w-full max-w-[36rem]">
            <Stack
              cards={AI_SKILLS.map((skill, i) => (
                <SkillCard key={skill.id} skill={skill} isTop={i === top} />
              ))}
              layout="fan"
              visible={4}
              spread={0.6}
              radius={0}
              shadow={false}
              sendToBackOnClick
              onChange={setTop}
            />
          </div>
        </Spawn>
      </div>
      <ul className="sr-only">
        {AI_SKILLS.map((skill) => (
          <li key={skill.id}>
            <a href={skill.href} target="_blank" rel="noreferrer">{skill.name} ({skill.source}) : {skill.text}<span> (nouvel onglet)</span></a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default AiSkills
