import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import useModal from '../hooks/useModal'
import cvPreview from '../assets/documents/cv-yanis-mdoughy.webp'
import cvPdf from '../assets/documents/CV_Yanis_Mdoughy.pdf'

// Aperçu du CV. On affiche une image de la page plutôt que le PDF dans un
// <iframe> : la visionneuse intégrée du navigateur impose son propre zoom (page
// coupée sur mobile, barre d'outils envahissante) et Safari iOS refuse souvent
// d'afficher un PDF embarqué. L'image tient entière à l'ouverture, et un bouton
// la passe en pleine largeur pour lire les détails ; le vrai PDF reste
// accessible au téléchargement et dans un nouvel onglet.
// L'aperçu est un rendu de la page 1 du PDF : à régénérer si le CV change.
function CvModal({ isOpen, onClose }) {
  const [zoomed, setZoomed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const scroller = useRef(null)

  useModal(onClose, isOpen)

  if (!isOpen) return null

  // En zoom, on recentre le cadre pour ne pas se retrouver collé au bord gauche.
  const toggleZoom = () => {
    setZoomed((v) => {
      const next = !v
      requestAnimationFrame(() => {
        const el = scroller.current
        if (!el) return
        el.scrollLeft = next ? (el.scrollWidth - el.clientWidth) / 2 : 0
        el.scrollTop = 0
      })
      return next
    })
  }

  const action = 'flex h-9 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium ' +
    'text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 ' +
    'dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CV de Yanis Mdoughy"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-2 backdrop-blur-md animate-fade-in sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex h-[94dvh] flex-col overflow-hidden rounded-xl bg-white shadow-2xl
                     transition-[width] duration-300 dark:bg-slate-900 ${
          // Hors zoom, le panneau épouse la page (A4 : largeur = 0,708 × hauteur utile)
          // pour ne pas laisser deux bandes vides autour d'elle ; en zoom il s'élargit
          // pour offrir le plus de surface de lecture possible.
          zoomed
            ? 'w-[min(96vw,64rem)]'
            : 'w-[min(96vw,calc((94dvh-72px)*0.708))]'
        }`}
      >
        {/* Barre d'outils */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 px-3 py-2 dark:border-slate-800">
          <p className="flex min-w-0 items-baseline gap-2 truncate">
            <span className="font-code text-sm font-bold text-slate-900 dark:text-white">CV</span>
            <span className="truncate text-xs text-slate-400 dark:text-slate-500">Yanis Mdoughy</span>
          </p>

          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={toggleZoom}
              aria-pressed={zoomed}
              title={zoomed ? 'Voir la page entière' : 'Agrandir pour lire'}
              className={action}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
                {!zoomed && <line x1="11" y1="8" x2="11" y2="14" />}
              </svg>
              <span className="hidden sm:inline">{zoomed ? 'Réduire' : 'Agrandir'}</span>
            </button>

            <a href={cvPdf} download="CV_Yanis_Mdoughy.pdf" className={action} title="Télécharger le PDF">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="hidden sm:inline">Télécharger</span>
            </a>

            <a href={cvPdf} target="_blank" rel="noreferrer" className={action} title="Ouvrir le PDF dans un nouvel onglet">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="hidden lg:inline">Ouvrir</span>
            </a>

            <span className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le CV"
              title="Fermer (Échap)"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/50 dark:hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Page */}
        <div
          ref={scroller}
          className={`relative min-h-0 flex-1 bg-slate-100 dark:bg-slate-950 ${
            zoomed ? 'overflow-auto' : 'flex items-center justify-center overflow-hidden p-2 sm:p-4'
          }`}
        >
          {!loaded && (
            <p className="absolute inset-x-0 top-1/2 text-center font-code text-xs text-slate-400">
              Chargement du CV…
            </p>
          )}
          <img
            src={cvPreview}
            alt="CV de Yanis Mdoughy — page 1"
            onLoad={() => setLoaded(true)}
            onClick={toggleZoom}
            className={
              zoomed
                ? 'w-[190%] max-w-none cursor-zoom-out sm:w-full'
                : 'max-h-full w-auto max-w-full cursor-zoom-in object-contain shadow-sm'
            }
          />
        </div>

        {/* Aide */}
        <p className="shrink-0 border-t border-slate-100 px-3 py-1.5 text-center font-code text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-500">
          <span className="sm:hidden">Toucher la page pour {zoomed ? 'la réduire' : 'l’agrandir'}</span>
          <span className="hidden sm:inline">Cliquer sur la page pour {zoomed ? 'la réduire' : 'l’agrandir'} · Échap pour fermer</span>
        </p>
      </div>
    </div>,
    document.body,
  )
}

export default CvModal
