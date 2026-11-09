import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { STEAM_GAMES, ADN_ANIMES } from '../data/interests'
import Poke from '../components/game/Poke.jsx'
import Section from '../components/Section.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Spawn from '../components/Spawn.jsx'
import SteamWindow, { SteamMark } from '../components/SteamWindow.jsx'
import AdnWindow, { AdnMark } from '../components/AdnWindow.jsx'

// Vignette de lancement : visuel, logo, intitulé et compte. Ouvre la fenêtre dédiée (pastiche de l'interface
// Steam ou du site ADN).
function LauncherCard({ cover, badge, title, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className="group relative isolate block h-full min-h-[16rem] w-full cursor-pointer overflow-hidden border border-line text-left transition-colors duration-300 hover:border-bright"
    >
      <img src={cover} alt="" decoding="async" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />
      <div className="flex h-full min-h-[16rem] flex-col justify-end p-6 md:p-8">
        <div className="mb-4">{badge}</div>
        <h3 className="font-anton text-4xl uppercase leading-none tracking-wide">{title}</h3>
        <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
          {count}
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  )
}

function Interests() {
  const [open, setOpen] = useState(null)

  return (
    <Section id="interests">
      <SectionTitle kicker="Intérêts" level={6}>Intérêts</SectionTitle>
      <div className="relative grid gap-4 md:grid-cols-2">
        {/* Dracaufeu est perché sur le coin haut droit de la carte Anime, sans toucher au texte. */}
        <Poke name="charizard" from="up" tilt={4} inert className="z-10 -top-32 -right-4 md:-top-[10.5rem] md:right-6" />
        <Spawn>
          <LauncherCard cover={STEAM_GAMES[0].image} badge={<SteamMark className="h-8 w-8 text-[#66c0f4]" />} title="Jeux vidéo" count={`${STEAM_GAMES.length} jeux`} onClick={() => setOpen('steam')} />
        </Spawn>
        <Spawn delay={0.15}>
          <LauncherCard cover={ADN_ANIMES[0].image} badge={<AdnMark full className="h-9 w-9" />} title="Anime et manga" count={`${ADN_ANIMES.length} séries`} onClick={() => setOpen('adn')} />
        </Spawn>
      </div>

      {open === 'steam' && <SteamWindow onClose={() => setOpen(null)} />}
      {open === 'adn' && <AdnWindow onClose={() => setOpen(null)} />}
    </Section>
  )
}

export default Interests
