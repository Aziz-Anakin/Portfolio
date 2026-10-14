import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'motion/react'
import './TiltedCard.css'

const springValues = { damping: 30, stiffness: 100, mass: 2 }

// Inspiré de React Bits « Tilted Card » : la carte pivote en 3D selon la
// position du curseur. Sur écran tactile (iPhone…), elle oscille via une
// animation CSS exécutée par le GPU : aucun calcul JavaScript par image.
export default function TiltedCard({
  children,
  size = 320,
  rotateAmplitude = 16,
  scaleOnHover = 1.05,
  idleSway = true,
  className = '',
}) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [touchOnly] = useState(() => window.matchMedia('(hover: none)').matches)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)

  useEffect(() => {
    if (hovered || !idleSway || touchOnly) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const controls = animate(0, Math.PI * 2, {
      duration: 7,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (t) => {
        rotateX.set(Math.sin(t) * rotateAmplitude * 0.6)
        rotateY.set(Math.cos(t) * rotateAmplitude)
      },
    })
    return () => controls.stop()
  }, [hovered, idleSway, touchOnly, rotateAmplitude, rotateX, rotateY])

  const handleMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude)
  }

  const handleEnter = (e) => {
    if (e.pointerType !== 'mouse') return
    setHovered(true)
    scale.set(scaleOnHover)
  }

  const handleLeave = () => {
    setHovered(false)
    scale.set(1)
  }

  if (touchOnly) {
    return (
      <div className={`relative [perspective:900px] ${className}`} style={{ width: size, height: size, maxWidth: '100%' }}>
        <div
          className={`relative h-full w-full [transform-style:preserve-3d] ${idleSway ? 'tilted-card-sway' : ''}`}
          style={{ '--tilt-x': `${rotateAmplitude * 0.6}deg`, '--tilt-y': `${rotateAmplitude}deg` }}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      className={`relative [perspective:900px] ${className}`}
      style={{ width: size, height: size, maxWidth: '100%' }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
        style={{ rotateX, rotateY, scale }}
      >
        {children}
      </motion.div>
    </div>
  )
}
