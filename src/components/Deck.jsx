import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import useMediaQuery from '../hooks/useMediaQuery.js'

// Le portfolio est une présentation : une slide plein écran à la fois.
// Sur téléphone, c'est un site normal : toutes les sections s'empilent et on défile au doigt.
// On change de slide à la molette, aux flèches du clavier, au doigt ou par le menu. Si une slide est plus haute que l'écran, elle
// défile d'abord ; on ne change de slide qu'une fois arrivé au bord.

// Téléphones (portrait ou paysage) : site normal, la page défile. Ailleurs : slides.
const MOBILE = '(max-width: 767px), (pointer: coarse) and (max-height: 500px)'

const DeckContext = createContext(null)
export const useDeck = () => useContext(DeckContext)

// Délai minimal entre deux changements : absorbe l'inertie de la molette et du trackpad.
const COOLDOWN = 850

const isBlocked = () => Boolean(document.querySelector('[role="dialog"], [role="alertdialog"]'))

export function DeckProvider({ slides, children }) {
  const count = slides.length
  const mobile = useMediaQuery(MOBILE)
  const reduce = useReducedMotion()
  const [state, setState] = useState(() => {
    const fromHash = slides.findIndex((s) => `#${s.id}` === window.location.hash)
    return { index: Math.max(0, fromHash), dir: 1 }
  })
  const scroller = useRef(null)

  // Mobile : c'est le document qui défile (barre d'adresse Safari et Chrome comprise).
  useEffect(() => {
    document.documentElement.classList.toggle('flow', mobile)
    return () => document.documentElement.classList.remove('flow')
  }, [mobile])
  const lastChange = useRef(0)
  const lastInnerScroll = useRef(0)

  const goTo = useCallback(
    (target) => {
      const next = typeof target === 'string' ? slides.findIndex((s) => s.id === target) : target
      if (next < 0 || next >= count) return false
      if (mobile) {
        // Site normal : on fait défiler jusqu'à la section ; l'index suit le défilement.
        document.getElementById(slides[next].id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        lastChange.current = performance.now()
        return true
      }
      setState((prev) => (prev.index === next ? prev : { index: next, dir: next > prev.index ? 1 : -1 }))
      lastChange.current = performance.now()
      return true
    },
    [slides, count, mobile, reduce],
  )

  // Mobile : la section visible devient la slide courante (menu, hash, fond étoilé).
  const syncIndex = useCallback((next) => {
    setState((prev) => (prev.index === next ? prev : { index: next, dir: next > prev.index ? 1 : -1 }))
  }, [])

  const step = useCallback((dir) => goTo(stateRef.current.index + dir), [goTo])

  // Dernier état connu, lisible depuis les écouteurs sans les réabonner.
  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
    const id = slides[state.index].id
    history.replaceState(null, '', state.index === 0 ? window.location.pathname : `#${id}`)
  }, [state, slides])

  useEffect(() => {
    // Sur téléphone, seuls les liens internes sont interceptés : le reste est du défilement natif.
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]')
      if (!link) return
      if (goTo(link.getAttribute('href').slice(1))) e.preventDefault()
    }
    if (mobile) {
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
    }

    // La slide courante peut-elle encore défiler dans cette direction ?
    const canScroll = (dir) => {
      const el = scroller.current
      if (!el) return false
      return dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2
    }
    const ready = () => performance.now() - lastChange.current > COOLDOWN

    // Un geste de molette (ou l'inertie d'un trackpad) envoie des dizaines d'évènements :
    // après un changement de slide, on attend une pause dans le flux avant d'en accepter un autre.
    let wheelLocked = false
    let lastWheel = 0
    const onWheel = (e) => {
      if (isBlocked() || Math.abs(e.deltaY) <= Math.abs(e.deltaX) || Math.abs(e.deltaY) < 8) return
      const now = performance.now()
      const gap = now - lastWheel
      lastWheel = now
      if (wheelLocked) {
        if (gap < 220 || !ready()) return
        wheelLocked = false
      }
      const dir = e.deltaY > 0 ? 1 : -1
      if (canScroll(dir)) {
        lastInnerScroll.current = now
        return
      }
      // On vient de finir de défiler dans la slide : un geste de plus est demandé pour en sortir.
      if (now - lastInnerScroll.current < 350 || !ready()) return
      if (step(dir)) wheelLocked = true
    }

    const onKey = (e) => {
      if (isBlocked() || e.altKey || e.ctrlKey || e.metaKey) return
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const keys = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 }
      if (e.key in keys) {
        if (canScroll(keys[e.key])) return
        e.preventDefault()
        if (ready()) step(keys[e.key])
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(count - 1)
      }
    }

    let touch = null
    const onTouchStart = (e) => {
      const t = e.touches[0]
      touch = { x: t.clientX, y: t.clientY, up: !canScroll(-1), down: !canScroll(1) }
    }
    const onTouchEnd = (e) => {
      if (!touch || isBlocked()) return
      const t = e.changedTouches[0]
      const dx = t.clientX - touch.x
      const dy = t.clientY - touch.y
      const start = touch
      touch = null
      if (Math.abs(dy) < 56 || Math.abs(dy) < Math.abs(dx) * 1.4 || !ready()) return
      const dir = dy < 0 ? 1 : -1
      // Le geste doit avoir commencé au bord de la slide, sinon il sert à la faire défiler.
      if (dir > 0 ? start.down && !canScroll(1) : start.up && !canScroll(-1)) step(dir)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('click', onClick)
    }
  }, [goTo, step, count, mobile])

  const value = useMemo(
    () => ({ slides, count, index: state.index, dir: state.dir, current: slides[state.index], goTo, step, scroller, mobile, syncIndex }),
    [slides, count, state, goTo, step, mobile, syncIndex],
  )

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>
}

const ease = [0.16, 1, 0.3, 1]

// Scène : affiche la slide courante. L'ancienne sort d'un côté, la nouvelle entre de l'autre,
// dans le sens du déplacement (et en sens inverse quand on remonte).
export function DeckStage() {
  const { slides, current, dir, scroller, mobile, syncIndex } = useDeck()
  const reduce = useReducedMotion()

  // Mobile : repère la section au milieu de l'écran, et rejoint celle de l'ancre au chargement.
  useEffect(() => {
    if (!mobile) return
    const start = window.location.hash.slice(1)
    if (start && start !== slides[0].id) document.getElementById(start)?.scrollIntoView({ block: 'start' })
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) syncIndex(slides.findIndex((s) => s.id === entry.target.id))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [mobile, slides, syncIndex])

  // Éléments créés une seule fois : React ne retraverse pas toute la page à chaque section visible.
  const stacked = useMemo(() => slides.map((s) => s.render()), [slides])

  if (mobile) {
    return (
      <main className="relative z-10">
        {slides.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-label={s.label}
            className="flex scroll-mt-[var(--header-h)] flex-col pb-[max(2.5rem,env(safe-area-inset-bottom))]"
            style={i === 0 ? { minHeight: 'calc(100svh - var(--header-h))' } : undefined}
          >
            {stacked[i]}
          </section>
        ))}
      </main>
    )
  }

  const variants = reduce
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d) => ({ opacity: 0, y: d > 0 ? '12%' : '-12%' }),
        center: { opacity: 1, y: '0%' },
        exit: (d) => ({ opacity: 0, y: d > 0 ? '-8%' : '8%' }),
      }

  return (
    <main className="relative z-10 min-h-0 flex-1 overflow-hidden">
      <AnimatePresence initial={false} custom={dir}>
        <motion.section
          key={current.id}
          id={current.id}
          ref={scroller}
          aria-label={current.label}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease }}
          className="no-scrollbar absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain"
        >
          <div className="flex min-h-full flex-col pb-[clamp(1rem,4vh,2.5rem)]">{current.render()}</div>
        </motion.section>
      </AnimatePresence>
    </main>
  )
}
