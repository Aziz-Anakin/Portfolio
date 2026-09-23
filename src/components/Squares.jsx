import { useEffect, useRef, useState } from 'react'

// Inspiré de React Bits « Squares » : grille animée qui défile en diagonale,
// la case survolée s'illumine (souris uniquement). Sur écran tactile, la
// grille est un simple fond CSS fixe : aucun coût d'animation sur iPhone.
// Optimisé mobile : densité de pixels plafonnée, grille tracée en un seul
// chemin, fondu des bords en masque CSS et pause quand l'onglet est caché.
export default function Squares({
  direction = 'diagonal',
  speed = 0.4,
  borderColor = 'rgba(99, 102, 241, 0.18)',
  squareSize = 44,
  hoverFillColor = 'rgba(37, 99, 235, 0.22)',
  className = '',
}) {
  const canvasRef = useRef(null)
  const [touchOnly] = useState(() => window.matchMedia('(hover: none)').matches)

  useEffect(() => {
    if (touchOnly) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const offset = { x: 0, y: 0 }
    let hovered = null
    let animId = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const ox = offset.x % squareSize
      const oy = offset.y % squareSize

      if (hovered) {
        ctx.fillStyle = hoverFillColor
        ctx.fillRect(hovered.x * squareSize - ox, hovered.y * squareSize - oy, squareSize, squareSize)
      }

      ctx.beginPath()
      for (let x = -ox; x <= w + squareSize; x += squareSize) {
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, h)
      }
      for (let y = -oy; y <= h + squareSize; y += squareSize) {
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(w, y + 0.5)
      }
      ctx.lineWidth = 1
      ctx.strokeStyle = borderColor
      ctx.stroke()
    }

    const tick = () => {
      const s = Math.max(speed, 0.1)
      if (direction === 'right') offset.x = (offset.x - s + squareSize) % squareSize
      else if (direction === 'left') offset.x = (offset.x + s) % squareSize
      else if (direction === 'up') offset.y = (offset.y + s) % squareSize
      else if (direction === 'down') offset.y = (offset.y - s + squareSize) % squareSize
      else {
        offset.x = (offset.x - s + squareSize) % squareSize
        offset.y = (offset.y - s + squareSize) % squareSize
      }
      draw()
      animId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!reduced && !animId) animId = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(animId)
      animId = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      const rect = canvas.getBoundingClientRect()
      hovered = {
        x: Math.floor((e.clientX - rect.left + (offset.x % squareSize)) / squareSize),
        y: Math.floor((e.clientY - rect.top + (offset.y % squareSize)) / squareSize),
      }
      if (reduced) draw()
    }
    const onLeave = () => {
      hovered = null
      if (reduced) draw()
    }

    resize()
    start()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [touchOnly, direction, speed, borderColor, squareSize, hoverFillColor])

  const mask = 'radial-gradient(ellipse at center, #000 30%, transparent 75%)'

  if (touchOnly) {
    const line = `${borderColor} 0 1px, transparent 1px`
    return (
      <div
        aria-hidden="true"
        className={`w-full h-full ${className}`}
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          backgroundImage: `linear-gradient(90deg, ${line}), linear-gradient(${line})`,
          backgroundSize: `${squareSize}px ${squareSize}px`,
          backgroundPosition: 'center',
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block w-full h-full ${className}`}
      style={{
        // Fondu vers les bords géré par le compositeur plutôt que redessiné à chaque image.
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  )
}
