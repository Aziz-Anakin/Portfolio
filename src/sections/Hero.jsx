import { useReducedMotion } from 'motion/react'
import { PROFILE } from '../data/profile'
import ShapeGrid from '../components/ShapeGrid.jsx'
import { lazy, Suspense } from 'react'
import Reveal from '../components/Reveal.jsx'
import SnakeGrid from '../components/game/SnakeGrid.jsx'
import { Button } from '../components/ui/button.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'
import cvPdf from '../assets/documents/CV_Yanis_Mdoughy.pdf'

// Accueil : grande bannière en dégradé avec une grille de carrés (React Bits « Shape Grid ») et un serpent qui joue dessus.
const TextType = lazy(() => import('../components/TextType.jsx'))

function Hero() {
  const reduce = useReducedMotion()
  // Téléphone et tablette : grille plus fine et serpent dans la bande sous les boutons.
  const narrow = useMediaQuery('(max-width: 1023px)')
  const phone = useMediaQuery('(max-width: 639px)')
  const cell = phone ? 32 : narrow ? 40 : 56

  return (
    <section id="home">
      <div className="relative overflow-hidden bg-brand-gradient">
        <div className="absolute inset-0" aria-hidden="true">
          <ShapeGrid
            shape="square"
            cellSize={cell}
            direction="none"
            speed={0}
            lineColor="rgba(255,255,255,0.16)"
            hoverColor="#ffffff"
            fillOpacity={0.22}
            glow={0.2}
            intro={!reduce}
          />
        </div>

        <SnakeGrid cell={cell} below={narrow} />
        <div className="pointer-events-none relative mx-auto max-w-6xl px-5 pb-52 pt-16 sm:pt-20 md:pb-64 md:pt-32 lg:pb-24">
          <Reveal delay={0.08}>
            <h1 data-avoid className="mt-4 font-anton text-[clamp(3.5rem,12vw,9rem)] uppercase leading-[0.92] tracking-wide">
              Yanis{' '}
              <br />
              Mdoughy
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 min-h-[2lh] max-w-2xl font-mono text-sm uppercase tracking-wider md:text-base">
              {/* La machine à écrire (et sa bibliothèque) se charge après le reste : le texte du rôle est déjà là. */}
              <Suspense fallback={PROFILE.role}>
                <TextType
                  as="span"
                  text={[PROFILE.role, PROFILE.mainStack.join(' · ')]}
                  typingSpeed={45}
                  deletingSpeed={20}
                  pauseDuration={2200}
                  cursorCharacter="|"
                />
              </Suspense>
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div data-avoid className="pointer-events-auto mt-8 inline-flex items-center gap-3 border border-white/50 bg-black/25 px-4 py-3">
              <span aria-hidden="true" className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full bg-white opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 bg-white" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider">{PROFILE.availability}</span>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest">
              <span aria-hidden="true" className="animate-blink">▶</span> Press start
            </p>
            <div data-below className="pointer-events-auto mt-3 flex flex-wrap gap-3">
              <Button asChild variant="light" size="lg">
                <a href="#projects">Voir mes projets</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={cvPdf} target="_blank" rel="noreferrer" download="CV_Yanis_Mdoughy.pdf">Télécharger mon CV</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">Contact</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  )
}

export default Hero
