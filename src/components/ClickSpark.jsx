import { useRef, useEffect, useCallback } from 'react'

export default function ClickSpark({
  sparkColor = '#2563eb',
  sparkSize = 8,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 450,
  children,
}) {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])

  // Canvas plein écran fixe : il suit le viewport, donc l'effet fonctionne
  // dans toutes les sections quel que soit le défilement de la page.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const draw = ts => {
      animId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparksRef.current = sparksRef.current.filter(s => {
        const elapsed = ts - s.t
        if (elapsed >= duration) return false
        const p = elapsed / duration
        const ease = p * (2 - p)
        const dist = ease * sparkRadius
        const len = sparkSize * (1 - ease)
        const x1 = s.x + dist * Math.cos(s.a)
        const y1 = s.y + dist * Math.sin(s.a)
        const x2 = s.x + (dist + len) * Math.cos(s.a)
        const y2 = s.y + (dist + len) * Math.sin(s.a)
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.globalAlpha = 1 - p
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
        ctx.globalAlpha = 1
        return true
      })
    }
    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [sparkColor, sparkSize, sparkRadius, duration])

  // Écoute globale : un clic n'importe où sur le site déclenche l'effet.
  // Le canvas étant fixe et plein écran, les coordonnées viewport du clic
  // correspondent directement aux coordonnées du canvas.
  const handleClick = useCallback(e => {
    const x = e.clientX
    const y = e.clientY
    const now = performance.now()
    for (let i = 0; i < sparkCount; i++) {
      sparksRef.current.push({ x, y, a: (2 * Math.PI * i) / sparkCount, t: now })
    }
  }, [sparkCount])

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 9999,
        }}
      />
      {children}
    </>
  )
}
