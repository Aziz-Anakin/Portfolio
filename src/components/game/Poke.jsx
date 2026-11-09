import { motion, useReducedMotion } from 'motion/react'
import { POKEMON } from './pokemon.js'

// Pokémon posé dans la scène d'une section : illustration 2D en pixel art (jamais de 3D), placée en absolu dans
// le plus proche parent `relative`. Chaque section règle sa propre composition :
//  - `className` : position (top/right/bottom/left, z-index), `k` : échelle du sprite (multiple entier du sprite
//    d'origine, par point de rupture : « [--k:2] md:[--k:3] ») ;
//  - `clip` : rogne le sprite (inset CSS) pour qu'il sorte de derrière un bord ;
//  - `flip` : le sprite regarde à droite (par défaut il regarde à gauche) ; `tilt` : inclinaison de repos ;
//  - `from` : côté d'où il entre à l'écran (left, right, up, down) ; `halo` : décor derrière lui (losange, bloc) ;
//  - `tag` : petite plaquette de Pokédex ; `light` : éclaircit les sprites presque noirs (Zekrom) pour qu'on voie leurs détails ; `inert` : ne réagit pas à la souris (quand il chevauche un bouton).
// Mouvements très discrets : flottement + légère rotation, léger zoom au survol, apparition au défilement.
// Décoratif (aria-hidden) ; tout reste immobile avec `prefers-reduced-motion`.
const ENTER = {
  left: { x: -48, y: 0 },
  right: { x: 48, y: 0 },
  up: { x: 0, y: -32 },
  down: { x: 0, y: 36 },
}

function Poke({ name, className = '', k = '[--k:0.75] md:[--k:2]', clip, flip = false, tilt = 0, from = 'down', halo, tag = false, light = false, inline = false, inert = false, delay = 0, onGradient = false }) {
  const reduce = useReducedMotion()
  const p = POKEMON[name]
  const enter = ENTER[from]

  const sprite = (
    <div className="poke-float" style={{ '--poke-tilt': `${tilt}deg`, animationDelay: `${(delay * 7) % 3}s` }}>
      <div style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
        <img
          src={p.src}
          alt=""
          draggable={false}
          className="poke-sprite block max-w-none"
          style={{
            width: `calc(var(--k) * ${p.w}px)`,
            height: `calc(var(--k) * ${p.h}px)`,
            imageRendering: 'pixelated',
            clipPath: clip ? `inset(${clip})` : undefined,
            filter: `${light ? 'brightness(2.4) contrast(1.15) saturate(1.3) ' : ''}drop-shadow(0 12px 14px rgb(0 0 0 / ${onGradient ? 0.4 : 0.55}))`,
          }}
        />
      </div>
      {tag && (
        <p className={`mt-3 hidden font-mono text-[10px] uppercase leading-tight tracking-widest sm:block ${onGradient ? 'text-white' : 'text-bright'}`}>
          N°{p.no} · {p.name}
        </p>
      )}
    </div>
  )

  const inner = (
    <>
      {halo === 'diamond' && (
        <span aria-hidden="true" className={`absolute left-1/2 top-1/2 -z-10 block aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rotate-45 border ${onGradient ? 'border-white/50' : 'border-bright/40'}`} />
      )}
      {halo === 'block' && (
        <span aria-hidden="true" className="absolute -bottom-3 left-[12%] -z-10 block h-[58%] w-[70%] bg-brand-gradient opacity-40" />
      )}
      {sprite}
    </>
  )
  // En ligne : la boîte garde la largeur du sprite mais pas sa hauteur, il dépasse vers le haut.
  const body = inline ? <div className="absolute bottom-0 left-0">{inner}</div> : inner
  const box = inline ? { width: `calc(var(--k) * ${p.w}px)`, height: 0 } : undefined

  const cls = `poke-wrap ${inline ? 'relative shrink-0 self-end' : 'absolute'} isolate ${inert ? 'pointer-events-none' : 'pointer-events-none [&_.poke-sprite]:pointer-events-auto'} ${k} ${className}`
  if (reduce) {
    return <div aria-hidden="true" className={cls} style={box}>{body}</div>
  }
  return (
    <motion.div
      aria-hidden="true"
      className={cls}
      style={box}
      initial={{ opacity: 0, ...enter, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {body}
    </motion.div>
  )
}

export default Poke
