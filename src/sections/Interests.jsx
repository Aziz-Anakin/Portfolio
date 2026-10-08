import { useState } from 'react'
import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import SteamWindow, { SteamMark } from '../components/SteamWindow.jsx'
import AdnWindow, { AdnMark } from '../components/AdnWindow.jsx'
import { STEAM_GAMES, ADN_ANIMES } from '../data/interests'
import { ArrowUpRight } from '../components/Icons.jsx'

// Vignette de lancement : visuel assombri, logo, intitulé et compte. Ouvre une fenêtre dédiée.
function LauncherCard({ cover, accentClass, badge, title, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className="group relative isolate block h-full w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-transform duration-500 ease-out hover:-translate-y-1.5"
    >
      <img
        src={cover}
        alt=""
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className={`absolute inset-0 -z-10 ${accentClass}`} />

      <div className="flex h-full min-h-[10.5rem] flex-col justify-end p-6 sm:p-8">
        <div className="mb-4">{badge}</div>
        <h3 className="t-heading">{title}</h3>
        <span className="t-label mt-2 inline-flex items-center gap-2">
          {count}
          <ArrowUpRight size={13} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  )
}

function Interests() {
  const [open, setOpen] = useState(null)

  return (
    <SlideFrame title="Centres d’intérêt">
      <div className="grid gap-5 sm:grid-cols-2 lg:h-[min(56vh,30rem)] lg:gap-8">
        <Reveal delay={0.1} className="h-full">
          <LauncherCard
            cover={STEAM_GAMES[0].image}
            accentClass="bg-gradient-to-t from-[#0d1620] via-[#1b2838]/85 to-[#1b2838]/40"
            badge={<SteamMark className="h-8 w-8 text-[#66c0f4]" />}
            title="Jeux vidéo"
            count={`${STEAM_GAMES.length} jeux`}
            onClick={() => setOpen('steam')}
          />
        </Reveal>
        <Reveal delay={0.18} className="h-full">
          <LauncherCard
            cover={ADN_ANIMES[0].image}
            accentClass="bg-gradient-to-t from-[#080b18] via-[#0d1226]/85 to-[#0d1226]/40"
            badge={<AdnMark full className="h-9 w-9" />}
            title="Anime et manga"
            count={`${ADN_ANIMES.length} séries`}
            onClick={() => setOpen('adn')}
          />
        </Reveal>
      </div>

      {open === 'steam' && <SteamWindow onClose={() => setOpen(null)} />}
      {open === 'adn' && <AdnWindow onClose={() => setOpen(null)} />}
    </SlideFrame>
  )
}

export default Interests
