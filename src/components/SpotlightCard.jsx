import { useRef } from 'react'

// Inspiré de React Bits « Spotlight Card » : un halo blanc suit le curseur sur la carte.
// Sur écran tactile il n'y a pas de curseur : pas de halo.
export default function SpotlightCard({ children, className = '', spotlight = 'rgba(255,255,255,0.16)' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div ref={ref} onPointerMove={onMove} className={`group relative overflow-hidden rounded-3xl ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlight}, transparent 70%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
