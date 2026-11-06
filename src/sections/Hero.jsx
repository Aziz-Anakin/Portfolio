import Reveal from '../components/Reveal.jsx'
import WordsReveal from '../components/WordsReveal.jsx'
import { ArrowDown } from '../components/Icons.jsx'
import { PROFILE } from '../data/profile'
import DepthText from '../components/DepthText.jsx'
import photo from '../assets/images/photo.jpg'

// Accueil : un petit portrait discret, fondu dans le noir ; le nom et trois accès au premier plan.
// Chaque bloc entre à sa façon (voir Reveal) : portrait qui grossit, nom qui monte, rôle mot par mot,
// disponibilité depuis la gauche, boutons qui rebondissent.
function Hero({ onOpenCv }) {
  return (
    <div className="relative flex w-full flex-1 flex-col justify-end overflow-hidden md:flex-row md:items-center md:justify-start">
      {/* Portrait : petit et discret. Téléphone : au-dessus du nom, dans le flux, fondu vers le bas.
          Ordinateur : à droite, fondu circulaire. La position reste à ce conteneur ; l'animation est dans Reveal. */}
      <div
        aria-hidden="true"
        className="hero-photo relative mx-auto mb-5 aspect-square h-[min(56vw,34dvh)] shrink-0 opacity-90 md:absolute md:right-[9%] md:top-1/2 md:mx-0 md:mb-0 md:h-auto md:w-[min(24vw,26rem)] md:-translate-y-1/2"
      >
        <Reveal variant="zoom" delay={0.1} className="h-full w-full">
          <img src={photo} alt="" width="800" height="800" className="h-full w-full object-cover" />
        </Reveal>
      </div>

      {/* Invitation à défiler (ordinateur) */}
      <a href="#about" aria-label="Descendre vers le profil" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="t-label">Défiler</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/25" aria-hidden="true">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-white" />
        </span>
      </a>

      <div className="container-page relative z-10 w-full pb-4 md:pb-0">
        <h1 className="sr-only">Yanis Mdoughy, portfolio</h1>
        <Reveal as="p" delay={0.12} aria-hidden="true" className="flex flex-col items-start">
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
        </Reveal>

        <WordsReveal as="p" text={PROFILE.role} delay={0.3} className="t-lead mt-5" />

        <Reveal as="p" variant="left" delay={0.45} className="mt-4 flex items-center gap-3">
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="t-data">{PROFILE.availability}</span>
        </Reveal>

        <Reveal variant="pop" delay={0.6} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-1 md:mt-7">
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
        </Reveal>
      </div>
    </div>
  )
}

export default Hero
