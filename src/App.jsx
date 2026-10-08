import './styles/index.css'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { DeckProvider, DeckStage, useDeck } from './components/Deck.jsx'
import Header from './components/Header.jsx'
import Particles from './components/Particles.jsx'
import Error30k from './components/Error30k.jsx'
import CvModal from './components/CvModal.jsx'
import Hero from './sections/Hero.jsx'
import Profile from './sections/Profile.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Experience from './sections/Experience.jsx'
import Formation from './sections/Formation.jsx'
import Interests from './sections/Interests.jsx'
import Contact from './sections/Contact.jsx'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Fond : champ d'étoiles (React Bits « Particles »). Il glisse d'un cran à chaque slide,
// ce qui donne l'impression d'avancer dans le même espace.
function Stars() {
  const { index, mobile } = useDeck()

  // Téléphone : fond immobile, à la hauteur maximale de l'écran (lvh). Il ne bouge pas quand la
  // barre d'adresse se replie et n'est pas animé pendant le défilement.
  if (mobile) {
    return (
      <>
        <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[100lvh]" aria-hidden="true">
          <Particles particleCount={350} particleSpread={14} speed={0} particleBaseSize={90} sizeRandomness={1} maxSize={3.2} cameraDistance={22} />
        </div>
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[100lvh] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,5,10,0.5)_70%,rgba(4,5,10,0.92)_100%)]"
          aria-hidden="true"
        />
      </>
    )
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-x-0 -top-[20%] z-0 h-[140%]"
        aria-hidden="true"
        animate={{ y: `${-index * 2}%` }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Particles particleCount={700} particleSpread={14} speed={reduceMotion ? 0 : 0.05} particleBaseSize={90} sizeRandomness={1} maxSize={3.2} cameraDistance={22} />
      </motion.div>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,5,10,0.5)_70%,rgba(4,5,10,0.92)_100%)]"
        aria-hidden="true"
      />
    </>
  )
}

// Slides : l'écran est figé et chaque slide le remplit. Téléphone : la page défile normalement.
function Shell({ onOpenCv }) {
  const { mobile } = useDeck()
  return (
    <div className={mobile ? 'relative flex min-h-[100dvh] flex-col' : 'relative flex h-[100dvh] flex-col overflow-hidden'}>
      <Stars />
      <Header onOpenCv={onOpenCv} />
      <DeckStage />
    </div>
  )
}

function App() {
  const [isCvOpen, setIsCvOpen] = useState(false)

  // Les slides, dans l'ordre. `id` sert d'ancre (#projects) et `label` de titre court.
  const slides = useMemo(() => {
    const openCv = () => setIsCvOpen(true)
    return [
      { id: 'home', label: 'Accueil', render: () => <Hero onOpenCv={openCv} /> },
      { id: 'about', label: 'Profil', render: () => <Profile /> },
      { id: 'projects', label: 'Projets', render: () => <Projects /> },
      { id: 'skills', label: 'Compétences', render: () => <Skills /> },
      { id: 'experience', label: 'Expérience', render: () => <Experience /> },
      { id: 'formation', label: 'Formation', render: () => <Formation /> },
      { id: 'interests', label: 'Centres d’intérêt', render: () => <Interests /> },
      { id: 'contact', label: 'Contact', render: () => <Contact onOpenCv={openCv} /> },
    ]
  }, [])

  // Clin d'œil Star Citizen : l'onglet « se déconnecte » quand on le quitte.
  useEffect(() => {
    const title = document.title
    const onVisibility = () => {
      document.title = document.hidden ? '30K — Reviens dans le ’verse o7' : title
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <DeckProvider slides={slides}>
      <Shell onOpenCv={() => setIsCvOpen(true)} />
      <Error30k />
      {isCvOpen && <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />}
    </DeckProvider>
  )
}

export default App
