import Reveal from './Reveal.jsx'

// Titre de section : repère mono (niveau du jeu) au-dessus d'un titre Anton à plat. Les Pokémon ne sont plus ici :
// chaque section place le sien dans sa scène (game/Poke.jsx).
function SectionTitle({ kicker, level, children, onGradient = false }) {
  const label = level ? `NIVEAU ${String(level).padStart(2, '0')} · ${kicker}` : kicker
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="min-w-0">
        <p className={`font-mono text-xs uppercase tracking-widest ${onGradient ? 'text-white' : 'text-bright'}`}>{label}</p>
        <h2 className="mt-3 font-anton text-5xl uppercase leading-none tracking-wide md:text-7xl">{children}</h2>
      </div>
    </Reveal>
  )
}

export default SectionTitle
