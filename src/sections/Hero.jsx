import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown } from '../components/Icons.jsx'
import { PROFILE } from '../data/profile'
import DepthText from '../components/DepthText.jsx'
import photo from '../assets/images/photo.jpg'

const ease = [0.16, 1, 0.3, 1]

// Accueil : un petit portrait discret, fondu dans le noir ; le nom et trois accès au premier plan.
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
    <div className="relative flex w-full flex-1 items-end overflow-hidden md:items-center">
      {/* Portrait : petit et discret, en haut au centre sur téléphone, à droite sur ordinateur. Il s'efface vers le noir. */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease }}
        className="hero-photo absolute left-1/2 top-[13%] aspect-square w-40 -translate-x-1/2 opacity-90 md:left-auto md:right-[9%] md:top-1/2 md:w-[min(24vw,26rem)] md:-translate-y-1/2 md:translate-x-0"
      >
        <img
          src={photo}
          alt=""
          width="800"
          height="800"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Invitation à défiler (ordinateur) */}
      <a href="#about" aria-label="Descendre vers le profil" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="t-label">Défiler</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/25" aria-hidden="true">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-white" />
        </span>
      </a>

      <div className="container-page relative z-10 w-full pb-4 md:pb-0">
        <h1 className="sr-only">Yanis Mdoughy, portfolio</h1>
        <motion.p {...rise(0.12)} aria-hidden="true" className="flex flex-col items-start">
          {['Yanis', 'Mdoughy'].map((word, i) => (
            <DepthText
              key={word}
              text={word}
              layers={22}
              depth={2.2}
              tilt={5}
              phase={i * 1.2}
              faceColor="#ffffff"
              depthColor="var(--depth-title-back)"
              fontSize="clamp(3rem, min(10vw, 15vh), 7.5rem)"
              letterSpacing="0.01em"
              shadow={false}
              className="font-anton uppercase leading-[0.95]"
            />
          ))}
        </motion.p>

        <motion.p {...rise(0.22)} className="t-lead mt-5">
          {PROFILE.role}
        </motion.p>

        <motion.p {...rise(0.27)} className="mt-4 flex items-center gap-3">
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="t-data">{PROFILE.availability}</span>
        </motion.p>

        <motion.div {...rise(0.32)} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-1 md:mt-7">
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
