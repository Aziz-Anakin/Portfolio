import { useState } from 'react'
import { motion } from 'motion/react'
import { PARCOURS } from '../data/parcours'
import Poke from '../components/game/Poke.jsx'
import Section from '../components/Section.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'
import Spawn from '../components/Spawn.jsx'
import Stack from '../components/Stack.jsx'
import { CardLabel } from '../components/ui/card.jsx'

// Du plus récent au plus ancien : le Bachelor est la première carte, celle du dessus.
const FORMATIONS = PARCOURS.filter((step) => step.kind === 'Formation')
const pad = (n) => String(n).padStart(2, '0')

// Une carte de la pile : logo de l'école sur pastille blanche, diplôme, école, précisions.
function FormationCard({ f }) {
  return (
    <div className="flex h-full flex-col border border-line bg-panel p-6 sm:p-8">
      <CardLabel aside={f.current && <span className="bg-azure px-2 py-0.5 text-white">En cours</span>}>{f.years}</CardLabel>
      <div className="mt-5 flex h-16 w-16 shrink-0 items-center justify-center bg-white p-2">
        <img src={f.logo} alt={f.place} loading="lazy" decoding="async" draggable={false} className={`max-h-full max-w-full object-contain ${f.logoOnLight ? '' : 'brightness-0'}`} />
      </div>
      <h3 className="mt-5 font-anton text-3xl uppercase leading-tight tracking-wide">{f.title}</h3>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider">{f.place}</p>
      <ul className="mt-4 space-y-1.5 text-sm leading-relaxed">
        {f.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden="true" className="text-bright">—</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

// La formation en pile de cartes (React Bits « Stack ») : on touche ou on fait glisser la carte du dessus.
function Formation() {
  const [active, setActive] = useState(0)
  const current = FORMATIONS[active]

  return (
    <Section id="formation">
      {/* Zekrom se dresse en bas à gauche, sur un bloc de dégradé, sous la colonne du numéro. */}
      <Poke name="zekrom" from="down" flip tilt={-2} halo="block" rim k="[--k:2]" className="bottom-2 -left-2 md:bottom-4 md:left-0" />
      <SectionTitle kicker="Formation" level={5}>Formation</SectionTitle>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <p className="font-anton text-[clamp(3.5rem,9vw,7rem)] leading-none tracking-wide">
            <motion.span key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-block">
              {pad(active + 1)}
            </motion.span>
            <span className="ml-3 align-top font-mono text-xs tracking-widest">/ {pad(FORMATIONS.length)}</span>
          </p>
          <motion.p key={current.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-xl font-semibold leading-snug">
            {current.title}
          </motion.p>
          <p className="mt-6 hidden font-mono text-xs uppercase tracking-widest lg:block">Touche ou fais glisser la carte</p>
        </Reveal>

        <Spawn delay={0.1} className="lg:col-span-7 lg:col-start-6">
          {/* La taille vient du conteneur : Stack remplit 100 % de sa largeur et de sa hauteur */}
          <div className="mx-auto h-[clamp(21rem,52vh,25rem)] w-full max-w-[36rem]">
            <Stack
              cards={FORMATIONS.map((f) => (
                <FormationCard key={f.years + f.title} f={f} />
              ))}
              layout="fan"
              visible={FORMATIONS.length}
              spread={0.6}
              radius={0}
              shadow={false}
              sendToBackOnClick
              onChange={setActive}
            />
          </div>
        </Spawn>
      </div>
    </Section>
  )
}

export default Formation
