import { useState } from 'react'
import { createPortal } from 'react-dom'
import { STEAM_GAMES } from '../data/interests'
import useModal from '../hooks/useModal'

// Logo Steam officiel (tracé issu du jeu d'icônes Simple Icons).
// Marque déposée de Valve Corporation, utilisée ici à titre de référence.
export function SteamMark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" role="img" aria-hidden="true">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  )
}

// Pastiche de l'interface du client Steam : bibliothèque à gauche, fiche du jeu
// sélectionné à droite. Purement décoratif, aucune donnée Steam réelle.
export default function SteamWindow({ onClose }) {
  const [active, setActive] = useState(0)
  const game = STEAM_GAMES[active]

  useModal(onClose)

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bibliothèque de jeux"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[86vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-[#1b2838] shadow-2xl ring-1 ring-white/10 animate-zoom-in"
      >
        {/* Barre de titre */}
        <header className="flex shrink-0 items-center gap-4 border-b border-black/40 bg-[#171a21] px-4 py-2.5">
          <SteamMark className="h-5 w-5 shrink-0 text-[#c7d5e0]" />
          <nav className="hidden gap-4 font-code text-[11px] font-bold uppercase tracking-wider text-[#8f98a0] sm:flex">
            <span>Magasin</span>
            <span className="text-white">Bibliothèque</span>
            <span>Communauté</span>
          </nav>
          <span className="ml-auto hidden font-code text-[11px] text-[#8f98a0] sm:inline">Yanis</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la bibliothèque"
            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#8f98a0] sm:ml-0 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66c0f4]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Colonne bibliothèque (desktop) */}
          <aside className="hidden w-60 shrink-0 flex-col border-r border-black/40 md:flex">
            <div className="shrink-0 border-b border-black/30 p-3">
              <div className="flex items-center gap-2 rounded bg-black/25 px-2.5 py-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 text-[#8f98a0]" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="font-code text-[11px] text-[#8f98a0]">Rechercher</span>
              </div>
            </div>
            <p className="shrink-0 px-3 pb-1 pt-3 font-code text-[10px] font-bold uppercase tracking-widest text-[#8f98a0]">
              Jeux ({STEAM_GAMES.length})
            </p>
            <ul className="min-h-0 flex-1 overflow-y-auto pb-2">
              {STEAM_GAMES.map((g, i) => (
                <li key={g.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active}
                    className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#66c0f4] ${
                      i === active
                        ? 'bg-[#2a475e] text-white'
                        : 'text-[#c7d5e0] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <img src={g.image} alt="" loading="lazy" className="h-6 w-10 shrink-0 rounded-sm object-cover" />
                    <span className="truncate font-code text-xs">{g.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Fiche du jeu */}
          <div className="flex min-w-0 flex-1 flex-col">
            <main className="min-h-0 flex-1 overflow-y-auto">
              <div className="relative">
                <img
                  src={game.image}
                  alt={game.name}
                  className="h-44 w-full object-cover sm:h-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b2838] via-[#1b2838]/40 to-transparent" />
                <h3 className="absolute inset-x-5 bottom-3 font-anton text-2xl uppercase leading-none tracking-wide text-white sm:text-3xl">
                  {game.name}
                </h3>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded bg-gradient-to-b from-[#75b022] to-[#588a1b] px-7 py-2 font-code text-sm font-bold uppercase tracking-wide text-white shadow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21" />
                    </svg>
                    Jouer
                  </span>
                  <span className="font-code text-[11px] uppercase tracking-wider text-[#8f98a0]">
                    Installé
                  </span>
                </div>

                <p className="max-w-prose text-sm leading-relaxed text-[#c7d5e0]">{game.blurb}</p>

                <div className="flex flex-wrap gap-1.5">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-[#316282]/40 px-2 py-1 font-code text-[10px] text-[#66c0f4]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </main>

            {/* Bandeau bibliothèque (mobile) */}
            <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-black/40 bg-[#171a21] p-2 md:hidden">
              {STEAM_GAMES.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={g.name}
                  aria-current={i === active}
                  className={`h-11 w-[72px] shrink-0 overflow-hidden rounded ring-1 transition-all ${
                    i === active ? 'ring-2 ring-[#66c0f4]' : 'opacity-60 ring-white/10'
                  }`}
                >
                  <img src={g.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
