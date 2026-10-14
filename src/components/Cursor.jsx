import { useEffect, useRef } from 'react'

// Immersion à la souris (ordinateur uniquement, jamais au doigt ni si les animations sont réduites) :
//  - un point et un anneau qui suit le curseur avec un peu d'inertie ; l'anneau grossit sur les
//    liens et boutons, et affiche un mot sur les éléments marqués `data-cursor="Ouvrir"` ;
//  - une lueur douce qui éclaire le ciel étoilé autour du curseur ;
//  - un effet magnétique : les éléments marqués `data-magnetic` se penchent vers le curseur.
const INTERACTIVE = 'a[href], button, [role="button"], summary, label[for]'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)
  const glow = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return undefined

    const pos = { x: -100, y: -100 }
    const smooth = { x: -100, y: -100 }
    let mode = 'idle'
    let magnet = null
    let raf = 0
    let visible = false

    const setMode = (next, text) => {
      if (next === mode && !text) return
      mode = next
      const r = ring.current
      if (!r) return
      r.dataset.mode = next
      if (label.current) label.current.textContent = text || ''
    }

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        visible = true
        smooth.x = pos.x
        smooth.y = pos.y
        for (const el of [dot.current, ring.current, glow.current]) el && (el.style.opacity = '1')
      }

      const target = e.target instanceof Element ? e.target : null
      const labelled = target?.closest('[data-cursor]')
      if (labelled) setMode('label', labelled.getAttribute('data-cursor'))
      else if (target?.closest(INTERACTIVE)) setMode('link')
      else setMode('idle')

      // Effet magnétique : l'élément se penche vers le curseur, puis revient.
      const m = target?.closest('[data-magnetic]')
      if (magnet && magnet !== m) magnet.style.transform = ''
      magnet = m
      if (m) {
        const box = m.getBoundingClientRect()
        const dx = e.clientX - (box.left + box.width / 2)
        const dy = e.clientY - (box.top + box.height / 2)
        m.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.28).toFixed(1)}px)`
      }
    }
    const onLeave = () => {
      visible = false
      for (const el of [dot.current, ring.current, glow.current]) el && (el.style.opacity = '0')
      if (magnet) magnet.style.transform = ''
      magnet = null
    }

    const frame = () => {
      raf = requestAnimationFrame(frame)
      smooth.x += (pos.x - smooth.x) * 0.2
      smooth.y += (pos.y - smooth.y) * 0.2
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${smooth.x}px, ${smooth.y}px, 0)`
      if (glow.current) glow.current.style.transform = `translate3d(${smooth.x}px, ${smooth.y}px, 0)`
    }
    raf = requestAnimationFrame(frame)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      if (magnet) magnet.style.transform = ''
    }
  }, [])

  return (
    <>
      {/* Lueur : éclaire le fond autour du curseur, sous le contenu */}
      <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[5] opacity-0 transition-opacity duration-500" ref={glow}>
        <div className="-ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_38%,transparent_70%)]" />
      </div>
      <div aria-hidden="true" ref={ring} data-mode="idle" className="cursor-ring pointer-events-none fixed left-0 top-0 z-[200] opacity-0">
        <span ref={label} className="cursor-label" />
      </div>
      <div aria-hidden="true" ref={dot} className="cursor-dot pointer-events-none fixed left-0 top-0 z-[200] opacity-0" />
    </>
  )
}
