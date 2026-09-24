// React Bits « Spotlight Card » (https://reactbits.dev/components/spotlight-card),
// adapté aux thèmes clair / sombre du portfolio.
import { useRef, useState } from 'react'

function SpotlightCard({ children, className = '', spotlightColor = 'rgba(59, 130, 246, 0.18)' }) {
  const divRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(0.6) }}
      onBlur={() => { setIsFocused(false); setOpacity(0) }}
      onMouseEnter={() => setOpacity(0.6)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-500/50 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export default SpotlightCard
