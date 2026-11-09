import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import ChopperAssistant from './ChopperAssistant.jsx'

// Petites références à One Piece, dessinées à la main en pixel art (SVG) : aucune image officielle n'est reprise.
const PALETTE = { '#': '#f2c94c', o: '#ffe58a', R: '#d62828', P: '#ff7aa8', D: '#d9527f', W: '#ffffff', b: '#8a5a2b', B: '#4fa3ff', f: '#c68642', k: '#2b1a10', c: '#f3dcb0' }

const SPRITES = {
  // Chapeau de paille : calotte, ruban rouge, large bord.
  hat: ['......####......', '....########....', '...##oo######...', '...##########...', '...RRRRRRRRRR...', '...RRRRRRRRRR...', '.##############.', '################', '.##############.'],
  // Visage de Chopper : bois, chapeau rose à croix, museau et nez bleu.
  chopperFace: ['..b......b..', '..bb....bb..', '...b....b...', '..PPPPPPPP..', '.PPPPWWPPPP.', '.PPPWWWWPPP.', 'DDDDDDDDDDDD', '.ffkffffkff.', '.ffkffffkff.', '.fffcBBcfff.', '..ffccccff..', '...ffffff...'],
  // Chapeau rose à croix blanche, avec ses petits bois.
  chopper: ['..b......b..', '..bb....bb..', '...b....b...', '..PPPPPPPP..', '.PPPPWWPPPP.', '.PPPWWWWPPP.', '.PPPPWWPPPP.', 'PPPPPPPPPPPP', 'PDDDDDDDDDDP'],
}

export function PixelArt({ kind, size = 4, className = '' }) {
  const rows = SPRITES[kind]
  const w = rows[0].length
  return (
    <svg width={w * size} height={rows.length * size} viewBox={`0 0 ${w} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true" className={className}>
      {rows.flatMap((row, y) => [...row].map((c, x) => (c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={PALETTE[c]} />)))}
    </svg>
  )
}

const WORDS = ['luffy', 'onepiece', 'zoro', 'shanks', 'chopper']

// Easter eggs One Piece : (1) taper « luffy » (ou onepiece, zoro, shanks, chopper) fait pleuvoir des chapeaux de paille
// avec la phrase du futur Roi des pirates ; (2) Chopper, l'assistant du portfolio, se cache en bas à droite (voir
// ChopperAssistant) ; (3) quand l'onglet est quitté, son titre invite à revenir à bord. Décoratif, sans effet sur le
// contenu. Sans pluie ni tremblement avec `prefers-reduced-motion`.
function OnePieceEggs() {
  const reduce = useReducedMotion()
  const [rain, setRain] = useState(null) // { id, hats }
  const typed = useRef('')
  const timers = useRef([])

  useEffect(() => {
    const after = (fn, ms) => timers.current.push(setTimeout(fn, ms))
    const onKey = (e) => {
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return
      if (/^(input|textarea|select)$/i.test(e.target.tagName)) return
      typed.current = (typed.current + e.key.toLowerCase()).slice(-12)
      if (WORDS.some((w) => typed.current.endsWith(w))) {
        typed.current = ''
        const hats = Array.from({ length: 26 }, (_, i) => ({ i, left: Math.random() * 96, delay: Math.random() * 2.2, dur: 2.6 + Math.random() * 1.8, size: 3 + Math.floor(Math.random() * 3) }))
        setRain({ id: Date.now(), hats })
        after(() => setRain(null), 6200)
      }
    }
    const title = document.title
    const onVisibility = () => {
      document.title = document.hidden ? '☠ Reviens à bord, capitaine !' : title
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('visibilitychange', onVisibility)
    console.log('%c☠ Yohohoho ! Tape « luffy » sur la page, et recrute-moi avant la prochaine grande aventure.', 'font: 14px monospace')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('visibilitychange', onVisibility)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <>
      <ChopperAssistant />

      {rain && (
        <>
          <p role="status" className="fixed inset-x-0 top-24 z-[120] px-4 text-center font-anton text-3xl uppercase leading-tight tracking-wide text-[#f2c94c] drop-shadow-[0_2px_0_rgba(0,0,0,0.6)] sm:text-5xl">
            Je serai le Roi des pirates !
          </p>
          {!reduce && (
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[110] overflow-hidden">
              {rain.hats.map((h) => (
                <span key={h.i} className="onepiece-fall absolute top-0" style={{ left: `${h.left}%`, animationDelay: `${h.delay}s`, animationDuration: `${h.dur}s` }}>
                  <PixelArt kind="hat" size={h.size} />
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default OnePieceEggs
