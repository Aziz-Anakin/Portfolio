import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Clin d'œil à Star Citizen : taper « 30k » déclenche la fameuse erreur de déconnexion
// (Error 30000). La tradition veut qu'on salue d'un « F », puis d'un « o7 ».
function Error30k() {
  const [state, setState] = useState('idle') // idle | error | salute
  const typed = useRef('')

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const key = e.key.toLowerCase()

      if (state === 'error') {
        if (key === 'f') setState('salute')
        else if (key === 'escape') setState('idle')
        return
      }
      if (state === 'salute') {
        if (key === 'escape') setState('idle')
        return
      }
      typed.current = (typed.current + key).slice(-3)
      if (typed.current === '30k') {
        typed.current = ''
        setState('error')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state])

  // Se referme tout seul après le salut.
  useEffect(() => {
    if (state !== 'salute') return
    const t = setTimeout(() => setState('idle'), 2600)
    return () => clearTimeout(t)
  }, [state])

  return (
    <AnimatePresence>
      {state !== 'idle' && (
        <motion.div
          role="alertdialog"
          aria-label="Erreur 30000"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 z-[120] w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl bg-black/90 px-6 py-6 text-center backdrop-blur-xl"
        >
          {state === 'error' ? (
            <>
              <p className="t-title">Error 30000</p>
              <p className="t-label mt-3">Déconnecté du 'verse</p>
              <p className="t-label mt-4">Appuie sur <kbd className="px-1.5 py-0.5 font-bold text-black bg-white">F</kbd> pour saluer</p>
            </>
          ) : (
            <p className="t-title">o7</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Error30k
