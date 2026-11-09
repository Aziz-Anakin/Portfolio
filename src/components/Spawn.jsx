import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Steve from './game/Steve.jsx'

// Apparition « mode créatif » : quand le composant entre à l'écran, un personnage de pixel art marche le long de son
// bord supérieur et pose les blocs un à un, de gauche à droite (le composant se dévoile par colonnes de blocs, à
// l'endroit où il passe), avec le cube de visée devant lui. Puis il continue sa route et disparaît.
// Une seule fois par composant. Sans animation (le composant est simplement là) si l'utilisateur a réduit les
// mouvements ; le contenu reste dans la page pour les lecteurs d'écran pendant l'animation.
//   block    largeur d'une colonne de blocs, en px
//   size     hauteur du personnage, en px
//   speed    vitesse de marche, en px/s (la durée dépend de la largeur du composant)
//   delay    attente avant de partir, en secondes
function Spawn({ children, className = '', block = 36, size = 72, speed = 520, delay = 0 }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState(reduce ? 'done' : 'wait') // wait → walk → done
  const rootRef = useRef(null)
  const clipRef = useRef(null)
  const walkerRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    if (reduce || phase !== 'wait') return undefined
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) {
      setPhase('done')
      return undefined
    }
    let timer
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        timer = setTimeout(() => setPhase('walk'), delay * 1000)
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      clearTimeout(timer)
    }
  }, [reduce, phase, delay])

  useEffect(() => {
    if (phase !== 'walk') return undefined
    const root = rootRef.current
    const width = root.getBoundingClientRect().width
    const clip = clipRef.current
    const walker = walkerRef.current
    const cursor = cursorRef.current
    const run = width + 90 // il sort un peu à droite après avoir posé le dernier bloc
    const duration = (run / speed) * 1000
    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const x = t * run
      // Les blocs déjà posés : colonnes entières derrière lui.
      const placed = Math.min(width, Math.floor(x / block) * block)
      clip.style.clipPath = `inset(-30% ${Math.max(0, width - placed)}px -30% 0)`
      walker.style.transform = `translate3d(${x - 14}px,0,0)`
      walker.style.opacity = t > 0.88 ? String(Math.max(0, (1 - t) / 0.12)) : '1'
      // Cube de visée : sur la prochaine colonne à poser.
      cursor.style.transform = `translate3d(${Math.min(width - block, placed)}px,0,0)`
      cursor.style.opacity = placed >= width ? '0' : '1'
      if (t < 1) raf = requestAnimationFrame(tick)
      else setPhase('done')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, block, speed])

  if (phase === 'done') return <div className={className}>{children}</div>

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Avant le départ : masqué en entier ; en marche : dévoilé colonne par colonne */}
      <div ref={clipRef} className="h-full" style={{ clipPath: 'inset(-30% 100% -30% 0)' }}>
        {children}
      </div>
      {phase === 'walk' && (
        <>
          <div aria-hidden="true" ref={cursorRef} className="pointer-events-none absolute left-0 top-0 z-20 h-9 border-2 border-white/80 bg-white/10" style={{ width: block }} />
          <div aria-hidden="true" ref={walkerRef} className="steve-walker pointer-events-none absolute left-0 top-0 z-30" style={{ marginTop: -size }}>
            <Steve height={size} />
          </div>
        </>
      )}
    </div>
  )
}

export default Spawn
