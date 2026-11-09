import Reveal from './Reveal.jsx'
import Poke from './game/Poke.jsx'

// Titre de section : repère mono (niveau du jeu) au-dessus d'un titre Anton à plat. Le Pokémon de la section (`poke`)
// se tient juste à droite du titre, posé sur sa ligne de base ; il dépasse vers le haut sans pousser le contenu.
function SectionTitle({ kicker, level, poke, children, onGradient = false }) {
  const label = level ? `NIVEAU ${String(level).padStart(2, '0')} · ${kicker}` : kicker
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className={`font-mono text-xs uppercase tracking-widest ${onGradient ? 'text-white' : 'text-bright'}`}>{label}</p>
      <div className="mt-3 flex items-end gap-3 md:gap-5">
        <h2 className="min-w-0 font-anton text-5xl uppercase leading-none tracking-wide md:text-7xl">{children}</h2>
        {poke && <Poke inline name={poke} rim={poke === 'zekrom'} onGradient={onGradient} from="left" />}
      </div>
    </Reveal>
  )
}

export default SectionTitle
