import { motion, useReducedMotion } from 'motion/react'
import { useDeck } from './Deck.jsx'

// Texte qui se compose mot par mot : chaque mot sort du flou, l'un après l'autre
// (dans l'esprit de React Bits « Blur Text »). Il ressort de la même façon quand on quitte la slide.
// Même logique que Reveal : entrée et sortie par AnimatePresence sur ordinateur,
// à l'entrée et à la sortie de l'écran sur téléphone.
const IN = [0.16, 1, 0.3, 1]

const parent = (delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  out: { transition: { staggerChildren: 0.02 } },
})
const word = {
  hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: IN } },
  out: { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.25 } },
}

function WordsReveal({ text, as = 'p', delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  const deck = useDeck()
  const Tag = motion[as]

  if (reduce) {
    const Plain = as
    return <Plain className={className}>{text}</Plain>
  }

  const mobile = deck?.mobile
  const motionProps = mobile
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: false, amount: 0.4 } }
    : { initial: 'hidden', animate: 'show', exit: 'out' }

  return (
    <Tag className={className} variants={parent(mobile ? delay : delay + 0.2)} aria-label={text} {...motionProps}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} aria-hidden="true" variants={word} className="inline-block">
          {w}
          {' '}
        </motion.span>
      ))}
    </Tag>
  )
}

export default WordsReveal
