import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ADN_ANIMES } from '../data/interests'
import useModal from '../hooks/useModal'
import adnLogo from '../assets/brands/adn-logo.png'
import adnMark from '../assets/brands/adn-mark.png'

// Couleurs relevées sur le logo officiel ADN (dégradé bleu → cyan).
// Exposées en variables CSS : les modifier ici reteinte toute la fenêtre.
const ADN_BLUE = '#00aaff'
const ADN_CYAN = '#3bf5f0'

// Logo officiel Animation Digital Network. Marque déposée d'ADN,
// utilisée ici à titre de référence. `full` = logo complet avec typo,
// sinon la seule lettre « A » détourée (lisible en petit).
export function AdnMark({ className = '', full = false }) {
  return (
    <img
      src={full ? adnLogo : adnMark}
      alt="Animation Digital Network"
      className={`${full ? 'rounded-xl' : ''} object-contain ${className}`}
    />
  )
}

// Pastiche d'interface de la plateforme ADN : bannière de la série sélectionnée
// puis grille des séries préférées. Purement décoratif.
export default function AdnWindow({ onClose }) {
  const [active, setActive] = useState(0)
  const anime = ADN_ANIMES[active]

  useModal(onClose)

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mes animés préférés"
      onClick={onClose}
      style={{ '--adn-blue': ADN_BLUE, '--adn-cyan': ADN_CYAN }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[86vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-[#080b18] shadow-2xl ring-1 ring-white/10 animate-zoom-in"
      >
        {/* Barre de navigation */}
        <header className="flex shrink-0 items-center gap-4 border-b border-white/10 bg-[#0d1226] px-4 py-2.5">
          <AdnMark className="h-6 w-6 shrink-0" />
          <nav className="hidden gap-4 font-code text-[11px] font-bold uppercase tracking-wider text-slate-400 sm:flex">
            <span>Catalogue</span>
            <span>Simulcast</span>
            <span className="text-white">Mes favoris</span>
          </nav>
          <span className="ml-auto hidden font-code text-[11px] text-slate-400 sm:inline">Yanis</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded text-slate-400 transition-colors hover:bg-white/10 hover:text-white sm:ml-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--adn-cyan)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          {/* Bannière de la série sélectionnée */}
          <div className="relative">
            <img src={anime.image} alt={anime.name} className="h-52 w-full object-cover sm:h-72" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b18] via-[#080b18]/50 to-transparent" />
            <div className="absolute inset-x-5 bottom-4 flex flex-col gap-3">
              <h3 className="font-anton text-3xl uppercase leading-none tracking-wide text-white sm:text-4xl">
                {anime.name}
              </h3>
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 font-code text-xs font-bold uppercase tracking-wide text-[#04121f] shadow-lg"
                style={{ backgroundImage: `linear-gradient(90deg, ${ADN_BLUE}, ${ADN_CYAN})` }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21" />
                </svg>
                Regarder
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-5 py-5">
            <p className="max-w-prose text-sm leading-relaxed text-slate-300">{anime.blurb}</p>
            <div className="flex flex-wrap gap-1.5">
              {anime.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-2.5 py-1 font-code text-[10px] text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Grille des séries préférées */}
          <section className="border-t border-white/10 px-5 py-5">
            <h4 className="mb-3 font-code text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Mes animés préférés
            </h4>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {ADN_ANIMES.map((a, i) => (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active}
                    className={`group block w-full overflow-hidden rounded-lg text-left ring-1 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 ${
                      i === active
                        ? 'ring-2 ring-[color:var(--adn-cyan)]'
                        : 'ring-white/10 hover:ring-white/30'
                    }`}
                  >
                    <span className="block aspect-[16/9] overflow-hidden">
                      <img
                        src={a.image}
                        alt=""
                        loading="lazy"
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          i === active ? '' : 'opacity-75 group-hover:opacity-100'
                        }`}
                      />
                    </span>
                    <span className="block truncate bg-[#0d1226] px-2.5 py-2 font-code text-[11px] font-semibold text-white">
                      {a.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>,
    document.body,
  )
}
