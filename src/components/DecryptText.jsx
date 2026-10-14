import { useEffect, useMemo, useRef } from 'react'

// Texte « déchiffré » (dans l'esprit de React Bits « Decrypted Text »), pensé pour un paragraphe :
// au départ chaque lettre est un symbole de code qui change sans cesse ; puis les lettres se
// fixent une à une, de gauche à droite, avec un peu de hasard dans l'ordre. L'animation démarre
// quand le texte entre à l'écran et ne se joue qu'une fois.
// La mise en page ne bouge pas : chaque lettre réserve la place de sa vraie lettre.
const GLYPHS = '{}[]<>/\\=+*#%&$@~^0123456789abcdefghijklmnopqrstuvwxyz'
const TICK = 55
const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0]

function DecryptText({ text, as: Tag = 'p', className = '', delay = 0.2 }) {
  const finals = useRef([])
  const scrambles = useRef([])
  const rootRef = useRef(null)

  // Mots → lettres : un mot ne se coupe jamais en fin de ligne.
  const words = useMemo(() => {
    let index = 0
    return text.split(' ').map((word) => {
      const letters = Array.from(word).map((char) => ({ char, index: index++ }))
      return letters
    })
  }, [text])
  const total = useMemo(() => words.reduce((n, w) => n + w.length, 0), [words])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const showAll = () => {
      finals.current.forEach((el) => el && (el.style.opacity = '1'))
      scrambles.current.forEach((el) => el && (el.style.opacity = '0'))
    }
    if (reduce) {
      showAll()
      return undefined
    }

    // Instant d'arrivée de chaque lettre : de gauche à droite, avec du désordre.
    const duration = Math.min(3400, Math.max(1700, total * 7))
    const times = Array.from({ length: total }, (_, i) => (i / total) * duration * 0.86 + Math.random() * duration * 0.14)
    const done = new Array(total).fill(false)
    const lastTick = new Array(total).fill(0)
    scrambles.current.forEach((el) => el && (el.textContent = glyph()))

    let raf = 0
    let start = 0
    const loop = (now) => {
      const elapsed = now - start
      let remaining = 0
      for (let i = 0; i < total; i++) {
        if (done[i]) continue
        if (elapsed >= times[i]) {
          done[i] = true
          const f = finals.current[i]
          const s = scrambles.current[i]
          if (f) f.style.opacity = '1'
          if (s) s.style.opacity = '0'
        } else {
          remaining++
          if (now - lastTick[i] > TICK) {
            lastTick[i] = now
            const s = scrambles.current[i]
            if (s) s.textContent = glyph()
          }
        }
      }
      if (remaining) raf = requestAnimationFrame(loop)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        start = performance.now() + delay * 1000
        raf = requestAnimationFrame(loop)
      },
      { threshold: 0.25 },
    )
    observer.observe(root)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [total, delay])

  return (
    <Tag ref={rootRef} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((letters, w) => (
          <span key={w}>
            {w > 0 && ' '}
            <span className="inline-block whitespace-nowrap">
              {letters.map(({ char, index }) => (
                <span key={index} className="relative inline-block">
                  <span ref={(el) => (finals.current[index] = el)} style={{ opacity: 0 }}>
                    {char}
                  </span>
                  <span
                    ref={(el) => (scrambles.current[index] = el)}
                    className="font-code pointer-events-none absolute inset-0 text-center text-[0.85em] opacity-80"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  )
}

export default DecryptText
