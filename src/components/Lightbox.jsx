import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

// Modale d'aperçu plein écran. Rendue dans <body> via portail pour échapper
// aux contextes overflow/transform des cartes. Ferme au clic sur le fond ou
// Échap ; flèches gauche/droite pour naviguer entre les captures.
export default function Lightbox({ images, index = 0, title = '', onClose }) {
  const [i, setI] = useState(index)
  const count = images.length

  const prev = useCallback(() => setI((v) => (v - 1 + count) % count), [count])
  const next = useCallback(() => setI((v) => (v + 1) % count), [count])

  useEffect(() => { setI(index) }, [index])

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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Aperçu de ${title}` : 'Aperçu'}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-slate-950/85 backdrop-blur-sm animate-fade-in"
    >
      {/* Fermer */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer l'aperçu"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:rotate-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Précédent */}
      {count > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Capture précédente"
          className="absolute left-3 sm:left-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-5xl flex-col items-center"
      >
        <img
          key={i}
          src={images[i]}
          alt={title ? `${title} — aperçu ${i + 1}` : `Aperçu ${i + 1}`}
          className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl ring-1 ring-white/10 animate-zoom-in"
        />
        <figcaption className="mt-4 flex items-center gap-3 text-sm text-slate-300">
          {title && <span className="font-code font-semibold text-white">{title}</span>}
          {count > 1 && (
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs tabular-nums text-slate-200">
              {i + 1} / {count}
            </span>
          )}
        </figcaption>
      </figure>

      {/* Suivant */}
      {count > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Capture suivante"
          className="absolute right-3 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
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
