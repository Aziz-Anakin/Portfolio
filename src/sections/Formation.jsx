import SectionHeading from '../components/SectionHeading.jsx'
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

function Formation() {
  return (
    <section id="formation" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Formation" mark={mark} />

        <ol className="max-w-3xl space-y-10">
          {items.map((item) => (
            <li
              key={item.years + item.title}
              className="reveal"
              data-reveal
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-code text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {item.years}
                </span>
              </div>

              <p className="mt-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {item.highlight
                  ? <span className="text-blue-600 dark:text-blue-400">{item.place}</span>
                  : item.place}
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.status}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Formation
