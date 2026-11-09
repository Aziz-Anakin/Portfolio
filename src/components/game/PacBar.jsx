import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Ghost, GHOST_COLORS, PacMan, Pixel } from './sprites.jsx'

// Bande animée en bas de l'écran, purement décorative (aucun texte, aucun bouton, rien à cliquer) : dans un
// couloir de labyrinthe, Pac-Man mange les points et une cerise, avale la super-pastille, fait demi-tour et chasse les
// fantômes, puis recommence. Rien ne se superpose : les fantômes gardent leur distance, Pac-Man mange un point, la
// cerise ou la pastille quand sa bouche l'atteint, et un fantôme mangé éclate sur place. Les éléments s'adaptent à la
// largeur (trois tailles). Image fixe avec `prefers-reduced-motion`.
const RUN = 120 // vitesse de Pac-Man qui fuit (px/s)
const HUNT = 150 // vitesse de Pac-Man qui chasse
const SCARED = 90 // vitesse des fantômes apeurés
const POWER_TIME = 7 // durée de la super-pastille (s)

// Trois tailles : téléphone, tablette, ordinateur.
const TIERS = [
  { pac: 22, ghost: 20, gap: 20, cherry: 2, bar: 'h-10' },
  { pac: 26, ghost: 24, gap: 22, cherry: 3, bar: 'h-11' },
  { pac: 30, ghost: 28, gap: 24, cherry: 3, bar: 'h-12' },
]

const makeGhosts = () => GHOST_COLORS.map(() => ({ mode: 'chase', x: -200 }))

function PacBar() {
  const reduce = useReducedMotion()
  const [width, setWidth] = useState(0)
  const [modes, setModes] = useState(() => GHOST_COLORS.map(() => 'chase'))
  const [flash, setFlash] = useState(false)
  const [look, setLook] = useState(1)

  const laneRef = useRef(null)
  const pacRef = useRef(null)
  const pelletRef = useRef(null)
  const fruitRef = useRef(null)
  const dotRefs = useRef([])
  const ghostRefs = useRef([])
  const S = useRef({ phase: 'run', x: -40, dir: 1, power: 0, combo: 0, wait: 0, t: 0, nextDot: 0, pellet: true, fruit: true, ghosts: makeGhosts() })

  const tier = TIERS[width < 420 ? 0 : width < 768 ? 1 : 2]
  const { pac, ghost, gap, cherry } = tier
  const pelletX = Math.round(width * 0.82)
  const fruitX = Math.round(width * 0.42)
  const space = ghost + 10 // distance entre deux fantômes (jamais de chevauchement)

  useEffect(() => {
    const el = laneRef.current
    if (!el) return undefined
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!width) return undefined
    const s = S.current
    const count = Math.floor(width / gap)
    const half = pac / 2
    const timers = []
    const syncModes = () => setModes(s.ghosts.map((g) => g.mode))
    const draw = () => {
      if (pacRef.current) pacRef.current.style.transform = `translate3d(${s.x - half}px,-50%,0) scaleX(${s.dir})`
      s.ghosts.forEach((g, i) => {
        const el = ghostRefs.current[i]
        if (el) {
          el.style.transform = `translate3d(${g.x - ghost / 2}px,-50%,0)`
          el.style.visibility = g.mode === 'gone' ? 'hidden' : 'visible'
        }
      })
    }
    // Un fantôme mangé éclate sur place (animation courte) puis disparaît jusqu'au tour suivant.
    const eatGhost = (g) => {
      g.mode = 'pop'
      syncModes()
      timers.push(
        setTimeout(() => {
          g.mode = 'gone'
          syncModes()
        }, 260),
      )
    }
    const reset = () => {
      Object.assign(s, { phase: 'run', x: -40, dir: 1, power: 0, combo: 0, wait: 0, nextDot: 0, pellet: true, fruit: true })
      s.ghosts = s.ghosts.map((_, i) => ({ mode: 'chase', x: -40 - pac - space * (i + 1) }))
      dotRefs.current.forEach((el) => el && (el.style.opacity = '1'))
      if (pelletRef.current) pelletRef.current.style.opacity = '1'
      if (fruitRef.current) fruitRef.current.style.opacity = '1'
      setLook(1)
      setFlash(false)
      syncModes()
    }

    if (reduce) {
      // Image fixe : Pac-Man au milieu, les fantômes derrière lui, à bonne distance.
      s.x = width * 0.55
      s.dir = 1
      s.ghosts.forEach((g, i) => {
        g.mode = 'chase'
        g.x = s.x - pac - space * (i + 1)
      })
      draw()
      syncModes()
      return undefined
    }

    reset()
    let last = performance.now()
    let raf = 0

    const step = (dt) => {
      if (s.wait > 0) {
        s.wait -= dt
        if (s.wait <= 0) reset()
        return
      }
      s.t += dt
      if (s.phase === 'run') {
        s.x += RUN * dt
        // Les fantômes suivent en file, chacun à sa place.
        s.ghosts.forEach((g, i) => {
          if (g.mode !== 'chase') return
          const target = s.x - pac - space * (i + 1)
          g.x += (target - g.x) * Math.min(1, 5 * dt)
        })
        // Pac-Man mange ce que sa bouche atteint.
        const mouth = s.x + half
        while (s.nextDot < count && s.nextDot * gap + 12 <= mouth) {
          const el = dotRefs.current[s.nextDot]
          if (el) el.style.opacity = '0'
          s.nextDot++
        }
        if (s.fruit && mouth >= fruitX) {
          s.fruit = false
          if (fruitRef.current) fruitRef.current.style.opacity = '0'
        }
        if (s.pellet && mouth >= pelletX) {
          // Super-pastille : Pac-Man fait demi-tour, les fantômes deviennent apeurés.
          s.pellet = false
          if (pelletRef.current) pelletRef.current.style.opacity = '0'
          s.phase = 'power'
          s.dir = -1
          s.power = POWER_TIME
          s.combo = 0
          s.ghosts.forEach((g) => g.mode === 'chase' && (g.mode = 'scared'))
          setLook(-1)
          syncModes()
        }
        if (s.x > width + 50) s.wait = 1.2
      } else {
        s.x -= HUNT * dt
        s.power -= dt
        s.ghosts.forEach((g) => {
          if (g.mode !== 'scared') return
          g.x -= SCARED * dt
          if (s.x - half - (g.x + ghost / 2) <= 0) eatGhost(g)
          else if (g.x < -40) {
            g.mode = 'gone'
            syncModes()
          }
        })
        setFlash((f) => ((s.power < 2) !== f ? s.power < 2 : f))
        if (s.power <= 0) {
          // Fin de l'effet : les fantômes restants repartent à la poursuite, devant Pac-Man.
          s.phase = 'run'
          s.dir = 1
          s.ghosts.forEach((g, i) => {
            if (g.mode === 'scared') {
              g.mode = 'chase'
              g.x = Math.min(g.x, s.x - pac - space * (i + 1))
            }
          })
          setLook(1)
          setFlash(false)
          syncModes()
        } else if (s.x < -50) {
          s.ghosts.forEach((g) => g.mode === 'scared' && (g.mode = 'gone'))
          syncModes()
          s.wait = 1.2
        }
      }
    }

    const tick = (now) => {
      step(Math.min(0.05, (now - last) / 1000))
      last = now
      draw()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [width, reduce, gap, pac, ghost, space, fruitX, pelletX])

  const count = Math.floor(width / gap)
  // Pas de point là où se trouvent la cerise et la pastille.
  const hidden = (x) => Math.abs(x - fruitX) < 20 || Math.abs(x - pelletX) < 16

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink pb-[env(safe-area-inset-bottom)]">
      <div className={`mx-auto max-w-6xl px-4 sm:px-5 ${tier.bar}`}>
        <div ref={laneRef} className="relative h-full overflow-hidden">
          {/* Couloir de labyrinthe : double filet bleu en haut et en bas, fermé aux deux bouts. */}
          <span className="absolute inset-x-0 top-1 h-[6px] border-y border-azure/80" />
          <span className="absolute inset-x-0 bottom-1 h-[6px] border-y border-azure/80" />
          {Array.from({ length: count }, (_, i) => {
            const x = i * gap + 12
            return hidden(x) ? null : <span key={i} ref={(el) => (dotRefs.current[i] = el)} className="absolute top-1/2 h-1 w-1 -translate-y-1/2 bg-bright" style={{ left: x }} />
          })}
          <span ref={pelletRef} className="absolute top-1/2 h-3 w-3 -translate-y-1/2 animate-blink bg-white" style={{ left: pelletX - 6 }} />
          <span ref={fruitRef} className="absolute top-1/2 -translate-y-1/2" style={{ left: fruitX - 12 }}>
            <Pixel kind="cherry" size={cherry} />
          </span>

          {GHOST_COLORS.map((color, i) => (
            <div key={color} ref={(el) => (ghostRefs.current[i] = el)} className="absolute left-0 top-1/2" style={{ transform: 'translate3d(-80px,-50%,0)' }}>
              <div className={modes[i] === 'pop' ? 'ghost-pop' : 'ghost-bob'} style={{ animationDelay: modes[i] === 'pop' ? '0s' : `${i * -0.18}s` }}>
                <Ghost color={color} mode={modes[i] === 'pop' ? 'scared' : modes[i]} look={look} flash={flash} size={ghost} />
              </div>
            </div>
          ))}
          <div ref={pacRef} className="absolute left-0 top-1/2 drop-shadow-[0_0_6px_rgba(255,216,77,0.6)]" style={{ transform: 'translate3d(-80px,-50%,0)' }}>
            <PacMan size={pac} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PacBar
