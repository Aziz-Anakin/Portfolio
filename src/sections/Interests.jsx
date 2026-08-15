import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import SteamWindow, { SteamMark } from '../components/SteamWindow.jsx'
import AdnWindow, { AdnMark } from '../components/AdnWindow.jsx'
import { STEAM_GAMES, ADN_ANIMES } from '../data/interests'
import mark from '../assets/marks/one-piece-1.svg'

// Vignette de lancement : image de fond assombrie, logo, intitulé et compte.
function LauncherCard({ cover, accentClass, glowClass, badge, title, subtitle, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className={`group relative isolate block w-full overflow-hidden rounded-2xl text-left ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${glowClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600`}
    >
      <img
        src={cover}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className={`absolute inset-0 -z-10 ${accentClass}`} />

      <div className="flex min-h-[190px] flex-col justify-end gap-1 p-6 sm:min-h-[210px]">
        <div className="mb-2">{badge}</div>
        <h3 className="font-anton text-2xl uppercase leading-none tracking-wide text-white sm:text-3xl">
          {title}
        </h3>
        <p className="font-code text-xs text-slate-300">{subtitle}</p>
        <span className="mt-3 inline-flex items-center gap-2 font-code text-[11px] font-bold uppercase tracking-wider text-white">
          {count}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </button>
  )
}

function Interests() {
  const [open, setOpen] = useState(null)

  return (
    <section id="interests" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Centres d'intérêt" mark={mark} />

        <p className="mb-8 max-w-prose text-sm text-slate-500 dark:text-slate-400">
          Deux interfaces à ouvrir pour voir ce que je joue et ce que je regarde.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <LauncherCard
            cover={STEAM_GAMES[0].image}
            accentClass="bg-gradient-to-t from-[#0d1620] via-[#1b2838]/85 to-[#1b2838]/40"
            glowClass="hover:shadow-[#1b2838]/40"
            badge={<SteamMark className="h-8 w-8 text-[#66c0f4]" />}
            title="Jeux vidéo"
            subtitle="Ouvrir ma bibliothèque Steam"
            count={`${STEAM_GAMES.length} jeux`}
            onClick={() => setOpen('steam')}
          />

          <LauncherCard
            cover={ADN_ANIMES[0].image}
            accentClass="bg-gradient-to-t from-[#080b18] via-[#0d1226]/85 to-[#0d1226]/40"
            glowClass="hover:shadow-[#00aaff]/25"
            badge={<AdnMark full className="h-9 w-9" />}
            title="Anime & Manga"
            subtitle="Voir mes séries préférées"
            count={`${ADN_ANIMES.length} séries`}
            onClick={() => setOpen('adn')}
          />
        </div>
      </div>

      {open === 'steam' && <SteamWindow onClose={() => setOpen(null)} />}
      {open === 'adn' && <AdnWindow onClose={() => setOpen(null)} />}
    </section>
  )
}

export default Interests
