import { useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

// Distance horizontale minimale (px) pour qu'un glissement compte comme une navigation.
const SWIPE_THRESHOLD = 45

// Modale d'aperçu plein écran. Rendue dans <body> via portail pour échapper
// aux contextes overflow/transform des cartes. Ferme au clic sur le fond ou
// Échap ; flèches gauche/droite pour naviguer entre les captures.
//
// Sur mobile, une capture d'écran d'application prise sur grand écran devient
// illisible une fois réduite à la largeur d'un téléphone : on peut donc glisser
// pour changer d'image et toucher l'image pour la passer en taille réelle, le
// cadre devenant alors défilable dans les deux axes.
export default function Lightbox({ images, index = 0, title = '', onClose }) {
  const [prevIndex, setPrevIndex] = useState(index)
  const [i, setI] = useState(index)
  const [zoomed, setZoomed] = useState(false)
  const touchStart = useRef(null)
  const count = images.length

  if (index !== prevIndex) {
    setPrevIndex(index)
    setI(index)
  }

  const prev = useCallback(() => { setZoomed(false); setI((v) => (v - 1 + count) % count) }, [count])
  const next = useCallback(() => { setZoomed(false); setI((v) => (v + 1) % count) }, [count])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, prev, next])

  // Glissement horizontal — désactivé en zoom, où le doigt sert à se déplacer dans l'image.
  const onTouchStart = (e) => {
    if (zoomed) return
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    if (zoomed || !touchStart.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    touchStart.current = null
    if (count > 1 && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next()
      else prev()
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Aperçu de ${title}` : 'Aperçu'}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8 bg-slate-950/90 backdrop-blur-sm animate-fade-in"
    >
      {/* Fermer */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer l'aperçu"
        className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:rotate-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Précédent — masqué en zoom pour libérer la surface de déplacement */}
      {count > 1 && !zoomed && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Capture précédente"
          className="absolute left-2 z-20 sm:left-6 hidden h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:-translate-x-0.5 sm:flex focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="flex max-h-full w-full max-w-5xl flex-col items-center"
      >
        <div
          className={`w-full rounded-xl ring-1 ring-white/10 ${
            zoomed ? 'overflow-auto bg-slate-900/60' : 'overflow-hidden'
          }`}
          style={zoomed ? { maxHeight: '78vh' } : undefined}
        >
          <img
            key={i}
            src={images[i]}
            alt={title ? `${title} — aperçu ${i + 1}` : `Aperçu ${i + 1}`}
            onClick={() => setZoomed((v) => !v)}
            className={
              zoomed
                ? 'w-[280%] max-w-none cursor-zoom-out sm:w-[160%]'
                : 'max-h-[78vh] w-full cursor-zoom-in object-contain animate-zoom-in'
            }
          />
        </div>

        <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
          {title && <span className="font-code font-semibold text-white">{title}</span>}
          {count > 1 && (
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs tabular-nums text-slate-200">
              {i + 1} / {count}
            </span>
          )}
          <span className="font-code text-[11px] text-slate-400">
            <span className="sm:hidden">{zoomed ? 'Toucher pour réduire' : 'Toucher pour zoomer'}</span>
            <span className="hidden sm:inline">{zoomed ? 'Cliquer pour réduire' : 'Cliquer pour zoomer'}</span>
            {count > 1 && !zoomed && <span className="sm:hidden"> · glisser pour naviguer</span>}
          </span>
        </figcaption>
      </figure>

      {/* Suivant */}
      {count > 1 && !zoomed && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Capture suivante"
          className="absolute right-2 z-20 sm:right-6 hidden h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:translate-x-0.5 sm:flex focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>,
    document.body,
  )
}
