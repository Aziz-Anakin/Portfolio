import SectionHeading from '../components/SectionHeading.jsx'
import StarBorder from '../components/StarBorder.jsx'
import mark from '../assets/marks/one-piece-5.svg'

const items = [
  {
    years: '2025 – 2028',
    title: 'Bachelor Informatique — Titre RNCP niveau 6',
    place: 'EPITECH (Paris)',
    highlight: true,
    status: "Diplôme en cours · Formation par projets (pédagogie par l'expérience)",
  },
  {
    years: '2023 – 2024',
    title: 'Mention complémentaire niveau 4 — Services numériques aux organisations',
    place: 'Groupe Scolaire Saint-Jean de Montmartre, Paris',
    status: 'Diplôme obtenu (mention assez bien)',
  },
  {
    years: '2022 – 2023',
    title: 'Bac pro — Métiers du commerce et de la vente',
    place: 'Groupe Scolaire Saint-Jean de Montmartre, Paris',
    status: 'Diplôme obtenu (mention assez bien)',
  },
]

function CapIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  )
}

// Carte « diplôme » : années en contour géant, statut, intitulé et établissement.
function DiplomaCard({ item }) {
  const [start, end] = item.years.split(' – ')

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-slate-900/80 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:p-7">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
          item.highlight ? 'bg-blue-500/30 opacity-80' : 'bg-indigo-500/20 opacity-40'
        }`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.highlight ? 'border-blue-400/50 bg-blue-500/15 text-blue-300' : 'border-white/10 bg-white/5 text-white'}`}>
          <CapIcon className="h-5 w-5" />
        </span>
        {item.highlight ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            En cours
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Obtenu
          </span>
        )}
      </div>

      <p className="relative mt-6 flex items-baseline gap-2 font-anton leading-none" aria-label={item.years}>
        <span className="text-5xl text-transparent sm:text-6xl" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>{start}</span>
        <span className="text-2xl text-blue-400">→ {end}</span>
      </p>

      <h3 className="relative mt-5 font-code text-base font-bold leading-snug text-white">{item.title}</h3>
      <p className={`relative mt-2 text-sm font-semibold ${item.highlight ? 'text-blue-300' : 'text-white'}`}>{item.place}</p>
      <p className="relative mt-auto pt-5 text-xs leading-relaxed text-white">{item.status}</p>
    </article>
  )
}

function Formation() {
  return (
    <section id="formation" className="py-20 sm:py-24 bg-transparent reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Formation" mark={mark} />

        <ol className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.years + item.title} className="reveal" data-reveal>
              {item.highlight ? (
                // Formation en cours : bordure animée React Bits « Star Border ».
                <StarBorder color="#60a5fa" speed="5s" thickness={1.5} className="h-full bg-blue-500/20">
                  <DiplomaCard item={item} />
                </StarBorder>
              ) : (
                <div className="h-full rounded-3xl border border-white/10 p-px">
                  <DiplomaCard item={item} />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Formation
