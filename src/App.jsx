import { useEffect } from 'react'
import Header from './components/Header.jsx'
import PacBar from './components/game/PacBar.jsx'
import OnePieceEggs from './components/game/OnePiece.jsx'
import Hero from './sections/Hero.jsx'
import Profile from './sections/Profile.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import AiSkills from './sections/AiSkills.jsx'
import Experience from './sections/Experience.jsx'
import Formation from './sections/Formation.jsx'
import Interests from './sections/Interests.jsx'
import Contact from './sections/Contact.jsx'

// Une seule adresse : l'URL du site ne change jamais (pas de #projects ni de #contact). Les liens internes
// (href="#id") font défiler jusqu'à la section sans toucher à l'adresse, et une adresse reçue avec un #id
// (ancien lien partagé) défile jusqu'à la section puis est nettoyée.
function useCleanAnchors() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const goTo = (id) => {
      const el = id === 'home' ? document.body : document.getElementById(id)
      if (!el) return false
      if (id === 'home') window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      // Le clavier et les lecteurs d'écran suivent : le focus passe sur la section, sans nouveau défilement.
      if (id !== 'home') {
        el.setAttribute('tabindex', '-1')
        el.focus({ preventScroll: true })
      }
      return true
    }
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const id = decodeURIComponent(a.getAttribute('href').slice(1))
      if (id && goTo(id)) e.preventDefault()
    }
    document.addEventListener('click', onClick)
    // Le # de l'adresse est changé à la main (sans recharger la page) : même traitement.
    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return
      goTo(id)
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.addEventListener('hashchange', onHash)
    // Adresse reçue avec un #id : on défile, puis on retire le #id de l'adresse.
    const initial = decodeURIComponent(window.location.hash.slice(1))
    let timer
    if (initial) {
      timer = setTimeout(() => {
        goTo(initial)
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }, 400)
    }
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
      clearTimeout(timer)
    }
  }, [])
}

// Page unique qui défile. Design : bleu et charcoal, angles droits (src/styles/site.css).
function App() {
  useCleanAnchors()
  return (
    <>
      <Header />
      <main className="pb-12">
        <Hero />
        <Profile />
        <Projects />
        <Skills />
        <AiSkills />
        <Experience />
        <Formation />
        <Interests />
        <Contact />
      </main>
      <PacBar />
      <OnePieceEggs />
    </>
  )
}

export default App
