import Reveal from './Reveal.jsx'
import PokeBadge from './game/PokeBadge.jsx'

// Titre de section : repère mono (niveau du jeu) au-dessus d'un titre Anton à plat ; à droite, le Pokémon de la
// section (`poke`).
function SectionTitle({ kicker, level, poke, children, onGradient = false }) {
  const label = level ? `NIVEAU ${String(level).padStart(2, '0')} · ${kicker}` : kicker
  return (
    <Reveal className="mb-10 flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4 md:mb-14">
      <div className="min-w-0">
        <p className={`font-mono text-xs uppercase tracking-widest ${onGradient ? 'text-white' : 'text-bright'}`}>{label}</p>
        <h2 className="mt-3 font-anton text-5xl uppercase leading-none tracking-wide md:text-7xl">{children}</h2>
      </div>
      {poke && <PokeBadge names={poke} onGradient={onGradient} />}
    </Reveal>
  )
}

export default SectionTitle
