import rayquaza from '../../assets/pokemon/rayquaza.gif'
import kyogre from '../../assets/pokemon/kyogre.gif'
import groudon from '../../assets/pokemon/groudon.gif'
import kyurem from '../../assets/pokemon/kyurem.gif'
import zekrom from '../../assets/pokemon/zekrom.gif'
import charizard from '../../assets/pokemon/charizard.gif'
import palkia from '../../assets/pokemon/palkia.gif'
import giratina from '../../assets/pokemon/giratina.gif'
import dialga from '../../assets/pokemon/dialga.gif'
import pikachu from '../../assets/pokemon/pikachu.gif'
import mewtwo from '../../assets/pokemon/mewtwo.gif'
import lucario from '../../assets/pokemon/lucario.gif'
import gengar from '../../assets/pokemon/gengar.gif'

// Sprites animés en pixel art (jeux Pokémon Noir et Blanc, dépôt PokeAPI/sprites). Ils regardent vers la gauche.
// `no` : numéro du Pokédex national ; `type` : type(s).
export const POKEMON = {
  rayquaza: { name: 'Rayquaza', no: 384, type: 'Dragon · Vol', src: rayquaza },
  kyogre: { name: 'Kyogre', no: 382, type: 'Eau', src: kyogre },
  groudon: { name: 'Groudon', no: 383, type: 'Sol', src: groudon },
  kyurem: { name: 'Kyurem', no: 646, type: 'Dragon · Glace', src: kyurem },
  zekrom: { name: 'Zekrom', no: 644, type: 'Dragon · Électrik', src: zekrom },
  charizard: { name: 'Dracaufeu', no: 6, type: 'Feu · Vol', src: charizard },
  palkia: { name: 'Palkia', no: 484, type: 'Eau · Dragon', src: palkia },
  giratina: { name: 'Giratina', no: 487, type: 'Spectre · Dragon', src: giratina },
  dialga: { name: 'Dialga', no: 483, type: 'Acier · Dragon', src: dialga },
  pikachu: { name: 'Pikachu', no: 25, type: 'Électrik', src: pikachu },
  mewtwo: { name: 'Mewtwo', no: 150, type: 'Psy', src: mewtwo },
  lucario: { name: 'Lucario', no: 448, type: 'Combat · Acier', src: lucario },
  gengar: { name: 'Ectoplasma', no: 94, type: 'Spectre · Poison', src: gengar },
}

function Poke({ name, onGradient }) {
  const p = POKEMON[name]
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div className="poke-hop flex h-16 items-end sm:h-24">
        <img src={p.src} alt="" draggable={false} className="block h-auto max-h-full w-auto max-w-[4.25rem] object-contain sm:max-w-[6.5rem]" style={{ imageRendering: 'pixelated' }} />
      </div>
      <div className={`-mt-px h-1.5 w-14 sm:w-20 ${onGradient ? 'bg-white/40' : 'bg-line'}`} />
      <p className="mt-2 text-center font-mono text-[10px] uppercase leading-tight tracking-widest sm:text-[11px]">
        <span className={onGradient ? 'text-white' : 'text-bright'}>N°{p.no}</span>
        <span className="block">{p.name}</span>
        <span className="hidden sm:block">{p.type}</span>
      </p>
    </div>
  )
}

// Pokémon d'une section, rangés dans l'en-tête (un ou deux, selon la section) : chaque sprite flotte sur un socle,
// avec une plaquette de Pokédex (numéro, nom, type). Toujours au même endroit : à droite du titre dès 640 px,
// au-dessus sur téléphone. Décoratif (caché aux lecteurs d'écran).
function PokeBadge({ names, onGradient = false }) {
  const list = Array.isArray(names) ? names : [names]
  return (
    <div aria-hidden="true" className="flex shrink-0 items-end gap-5 sm:gap-6">
      {list.map((n) => (
        <Poke key={n} name={n} onGradient={onGradient} />
      ))}
    </div>
  )
}

export default PokeBadge
