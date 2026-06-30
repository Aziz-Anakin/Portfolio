import { useEffect, useMemo, useRef, useState } from 'react'

// Révèle les paragraphes mot à mot (effet "petit à petit"), déclenché à l'entrée
// dans le viewport. Tous les mots sont rendus dès le départ (juste masqués en
// opacité) : la hauteur du bloc est stable → aucun saut de scroll pendant l'animation.
function Typewriter({ paragraphs, className = '', wordDelay = 35 }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  const words = useMemo(() => {
    const arr = []
    paragraphs.forEach((p, pi) => {
      p.split(' ').forEach((text) => arr.push({ pi, text }))
    })
    return arr
  }, [paragraphs])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setStarted(true)
      setCount(words.length)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [words.length])

  useEffect(() => {
    if (!started || count >= words.length) return
    const t = setTimeout(() => setCount((c) => c + 1), wordDelay)
    return () => clearTimeout(t)
  }, [started, count, words.length, wordDelay])

  let idx = -1
  return (
    <div ref={ref} className={className}>
      {paragraphs.map((p, pi) => (
        <p key={pi}>
          {p.split(' ').map((word, wi) => {
            idx += 1
            const shown = idx < count
            return (
              <span
                key={wi}
                className={`transition-opacity duration-500 ${shown ? 'opacity-100' : 'opacity-0'}`}
              >
                {word}{wi < p.split(' ').length - 1 ? ' ' : ''}
              </span>
            )
          })}
        </p>
      ))}
    </div>
  )
}

export default Typewriter
