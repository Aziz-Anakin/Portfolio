import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from '../components/Icons.jsx'

const ease = [0.16, 1, 0.3, 1]

// Accueil : le nom et trois accès. Rien d'autre (le portrait reviendra plus tard : src/assets/images/photo.jpg).
function Hero({ onOpenCv }) {
  const reduce = useReducedMotion()
  // Entrée en cascade : chaque bloc monte à son tour.
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        }

  return (
    <div className="relative flex w-full flex-1 items-center overflow-hidden">
      <div className="container-page relative z-10 w-full">
        <h1 className="sr-only">Yanis Mdoughy, portfolio</h1>
        <motion.p {...rise(0.12)} aria-hidden="true" className="t-display">
          Yanis
          <br />
          Mdoughy
        </motion.p>

        <motion.div {...rise(0.32)} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-1 md:mt-8">
          <a href="#projects" className="btn btn-primary w-full sm:w-auto">
            Voir mes projets
            <ArrowDown />
          </a>
          <button type="button" onClick={onOpenCv} className="link">
            Mon CV
          </button>
          <a href="#contact" className="link">
            Me contacter
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
