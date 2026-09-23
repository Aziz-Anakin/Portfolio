import { useRef, useState } from 'react'

// Loupe — signale que l'aperçu est cliquable.
function MagnifierIcon({ className = '' }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

// Bande d'aperçus d'un projet.
// Mobile : carrousel horizontal à défilement magnétique, une vignette large à la
// fois (la suivante dépasse pour signaler qu'on peut faire défiler), avec des
// pastilles de position. Desktop : simple rangée de vignettes qui passe à la ligne.
export default function ScreenshotStrip({ screenshots, title, onOpen }) {
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const count = screenshots.length

  // Vignette la plus proche du bord gauche du cadre visible.
  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    let closest = 0
    let min = Infinity
    for (const [i, child] of [...track.children].entries()) {
      const d = Math.abs(child.offsetLeft - track.scrollLeft - track.clientLeft)
      if (d < min) {
        min = d
        closest = i
      }
    }
    setCurrent(closest)
  }

  const goTo = (i) => {
    const child = trackRef.current?.children[i]
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <div className="relative z-10 mt-4">
      <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
        <MagnifierIcon />
        {count} aperçu{count > 1 ? 's' : ''} —{' '}
        <span className="sm:hidden">toucher</span>
        <span className="hidden sm:inline">cliquer</span> pour agrandir
      </p>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1
                   sm:mx-0 sm:flex-wrap sm:overflow-x-visible sm:px-0"
      >
        {screenshots.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Agrandir l'aperçu ${i + 1} de ${title}`}
            className="group/shot relative w-[78%] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                       sm:w-40 sm:max-w-none"
          >
            <img
              src={src}
              alt={`Aperçu ${i + 1} de ${title}`}
              loading="lazy"
              className="aspect-video w-full object-cover object-top transition-transform duration-300 group-hover/shot:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/0 text-white opacity-0 transition-all duration-300 group-hover/shot:bg-slate-900/45 group-hover/shot:opacity-100">
              <MagnifierIcon className="h-5 w-5" />
            </span>
          </button>
        ))}
      </div>

      {/* Pastilles de position — mobile uniquement, le carrousel n'existe pas au-delà */}
      {count > 1 && (
        <div className="-my-2 flex sm:hidden">
          {screenshots.map((_, i) => (
            /* La pastille reste fine, mais la zone tactile fait 40px de haut. */
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller à l'aperçu ${i + 1}`}
              aria-current={i === current}
              className="flex h-10 items-center px-1.5"
            >
              <span
                aria-hidden="true"
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 bg-blue-600 dark:bg-blue-400'
                    : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
