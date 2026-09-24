import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const sections = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'experience', label: 'Expérience' },
  { id: 'formation', label: 'Formation' },
  { id: 'interests', label: "Centres d'intérêt" },
  { id: 'contact', label: 'Contact' },
]

const pad = (n) => String(n).padStart(2, '0')

// Section en cours, au centre de la barre : nom animé + jauge de segments.
function SectionIndicator({ className = '' }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(sections.findIndex((s) => s.id === entry.target.id))
          }
        }
      },
      // Une section est « active » quand elle traverse le milieu de l'écran.
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`flex-col items-center justify-center gap-1.5 ${className}`} aria-live="polite">
      <span className="relative block h-5 w-44 overflow-hidden text-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={sections[active].id}
            initial={{ y: 18, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -18, opacity: 0, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="absolute inset-0 font-anton text-[15px] uppercase leading-5 tracking-[0.12em] text-white"
          >
            {sections[active].label}
          </motion.span>
        </AnimatePresence>
      </span>

      <span className="flex items-center gap-2" aria-hidden="true">
        <span className="w-5 text-right font-code text-[10px] font-bold tabular-nums text-blue-400">{pad(active + 1)}</span>
        <span className="flex items-center gap-1">
          {sections.map((s, i) => (
            <span
              key={s.id}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? 'w-6 bg-gradient-to-r from-blue-500 to-violet-500' : i < active ? 'w-2 bg-blue-500/60' : 'w-2 bg-white/15'
              }`}
            />
          ))}
        </span>
        <span className="w-5 font-code text-[10px] font-bold tabular-nums text-white">{pad(sections.length)}</span>
      </span>
    </div>
  )
}

export default SectionIndicator
