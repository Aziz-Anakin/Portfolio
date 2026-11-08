import { motion, useReducedMotion } from 'motion/react'
import { useDeck } from './Deck.jsx'

// Apparition et disparition d'un bloc. Chaque bloc choisit son animation (`variant`) :
//
//   rise    monte en douceur            blur    sort du flou
//   left    glisse depuis la gauche     right   glisse depuis la droite
//   zoom    grossit en s'éclaircissant  flip    bascule en 3D
//   wipe    se dévoile de gauche à droite       wipeUp   se dévoile de bas en haut
//   pop     rebondit (ressort)          line    un trait qui se tire
//
// Ordinateur : le bloc joue son entrée à l'arrivée de la slide et sa sortie quand on la quitte
// (AnimatePresence, dans Deck.jsx). Sens de déplacement : vers le bas, ça monte ; vers le haut, ça descend.
// Téléphone : la page défile, le bloc entre à l'écran et ressort quand il le quitte, à chaque passage.
const OUT = [0.5, 0, 0.75, 0]
const IN = [0.16, 1, 0.3, 1]
const FULL = 'inset(-25% -25% -25% -25%)'

// hidden : état de départ ; show : état final (porte la transition) ; out : sortie.
const make = (variant, delay) => {
  const show = (extra = {}) => ({ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0, scaleX: 1, filter: 'blur(0px)', clipPath: FULL, ...extra, transition: { duration: 0.9, delay, ease: IN } })
  const out = (target) => ({ ...target, transition: { duration: 0.35, delay: delay * 0.2, ease: OUT } })
  switch (variant) {
    case 'blur':
      return { hidden: (d) => ({ opacity: 0, y: 18 * d, filter: 'blur(16px)' }), show, out: (d) => out({ opacity: 0, y: -12 * d, filter: 'blur(12px)' }) }
    case 'left':
      return { hidden: { opacity: 0, x: -90, filter: 'blur(6px)' }, show, out: out({ opacity: 0, x: -60, filter: 'blur(6px)' }) }
    case 'right':
      return { hidden: { opacity: 0, x: 90, filter: 'blur(6px)' }, show, out: out({ opacity: 0, x: 60, filter: 'blur(6px)' }) }
    case 'zoom':
      return { hidden: { opacity: 0, scale: 0.82 }, show, out: out({ opacity: 0, scale: 1.08 }) }
    case 'flip':
      return {
        hidden: (d) => ({ opacity: 0, rotateX: 55 * d, y: 30 * d, transformPerspective: 900 }),
        show: () => show({ transformPerspective: 900 }),
        out: (d) => out({ opacity: 0, rotateX: -35 * d, y: -20 * d, transformPerspective: 900 }),
      }
    case 'wipe':
      return {
        hidden: { clipPath: 'inset(-25% 100% -25% -25%)', opacity: 0 },
        show,
        out: out({ clipPath: 'inset(-25% -25% -25% 100%)', opacity: 0 }),
      }
    case 'wipeUp':
      return {
        hidden: { clipPath: 'inset(100% -5% -5% -5%)', opacity: 0 },
        show: () => show({ clipPath: 'inset(-5% -5% -5% -5%)' }),
        out: out({ clipPath: 'inset(-5% -5% 100% -5%)', opacity: 0 }),
      }
    case 'pop':
      return {
        hidden: { opacity: 0, scale: 0.4, rotate: -8 },
        show: () => show({ transition: { type: 'spring', stiffness: 240, damping: 16, delay } }),
        out: out({ opacity: 0, scale: 0.7 }),
      }
    case 'line':
      return { hidden: { scaleX: 0, originX: 0 }, show, out: out({ scaleX: 0, originX: 1 }) }
    default:
      return { hidden: (d) => ({ opacity: 0, y: 36 * d }), show, out: (d) => out({ opacity: 0, y: -24 * d }) }
  }
}

function Reveal({ as = 'div', variant = 'rise', delay = 0, children, ...props }) {
  const reduce = useReducedMotion()
  const deck = useDeck()
  const Tag = motion[as]

  if (reduce) {
    const Plain = as
    return <Plain {...props}>{children}</Plain>
  }

  const mobile = deck?.mobile
  const dir = deck?.dir ?? 1
  // Sur ordinateur, l'entrée attend un instant que l'ancienne slide commence à partir.
  const variants = make(variant, mobile ? delay : delay + 0.15)

  const motionProps = mobile
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: false, amount: 0.25 }, custom: 1 }
    : { initial: 'hidden', animate: 'show', exit: 'out', custom: dir }

  return (
    <Tag variants={variants} {...motionProps} {...props}>
      {children}
    </Tag>
  )
}

export default Reveal
