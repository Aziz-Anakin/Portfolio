import './styles/index.css'
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ClickSpark from './components/ClickSpark.jsx'
import Squares from './components/Squares.jsx'
import CvModal from './components/CvModal.jsx'
import Home from './sections/Home.jsx'
import About from './sections/About.jsx'
import Experience from './sections/Experience.jsx'
import Formation from './sections/Formation.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Interests from './sections/Interests.jsx'
import Contact from './sections/Contact.jsx'

function App() {
  const [isCvOpen, setIsCvOpen] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = document.querySelectorAll('[data-reveal]')

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <ClickSpark sparkColor="#2563eb" sparkCount={8} sparkRadius={20}>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-mono dark:bg-slate-950 dark:text-white">
        {/* Fond React Bits « Squares » : grille discrète, fixe derrière tout le site */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true">
          <Squares speed={0.25} squareSize={48} borderColor="rgba(99, 102, 241, 0.12)" hoverFillColor="rgba(59, 130, 246, 0.12)" />
        </div>
        <Header onOpenCv={() => setIsCvOpen(true)} />
        <main className="relative z-10 flex-1">
          <Home onOpenCv={() => setIsCvOpen(true)} />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Formation />
          <Interests />
          <Contact onOpenCv={() => setIsCvOpen(true)} />
        </main>
        <Footer />
        {isCvOpen && <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />}
      </div>
    </ClickSpark>
  )
}

export default App