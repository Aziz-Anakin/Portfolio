import './styles/index.css'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ClickSpark from './components/ClickSpark.jsx'
import Home from './sections/Home.jsx'
import About from './sections/About.jsx'
import Experience from './sections/Experience.jsx'
import Formation from './sections/Formation.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Setup from './sections/Setup.jsx'
import Interests from './sections/Interests.jsx'
import Contact from './sections/Contact.jsx'

function App() {
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
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-mono dark:bg-slate-950 dark:text-slate-100">
        <Header />
        <main className="flex-1">
          <Home />
          <About />
          <Projects />
          <Skills />
          <Setup />
          <Experience />
          <Formation />
          <Interests />
          <Contact />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}

export default App