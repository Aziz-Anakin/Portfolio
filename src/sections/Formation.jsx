import SectionHeading from '../components/SectionHeading.jsx'
import { Badge } from '../components/ui/badge.jsx'
import mark from '../assets/marks/one-piece-5.svg'

const items = [
  {
    years: '2025 – 2028',
    title: 'Bachelor Informatique — Titre RNCP niveau 6',
    place: 'EPITECH (Paris)',
    current: true,
    status: "Formation par projets (pédagogie par l'expérience)",
  },
  {
    years: '2023 – 2024',
    title: 'Mention complémentaire niveau 4 — Services numériques aux organisations',
    place: 'Groupe Scolaire Saint-Jean de Montmartre, Paris',
    status: 'Diplôme obtenu — mention assez bien',
  },
  {
    years: '2022 – 2023',
    title: 'Bac pro — Métiers du commerce et de la vente',
    place: 'Groupe Scolaire Saint-Jean de Montmartre, Paris',
    status: 'Diplôme obtenu — mention assez bien',
  },
]

function Formation() {
  return (
    <section id="formation" className="py-20 sm:py-24 bg-transparent reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Formation" mark={mark} />

        <div className="grid gap-10 border-t border-white/10 md:grid-cols-3 md:divide-x md:divide-white/10 md:border-t-0">
          {items.map((item) => (
            <div key={item.years + item.title} className="reveal border-t border-white/10 pt-8 first:border-t-0 first:pt-0 md:border-t-0 md:px-8 md:pt-0 md:first:pl-0 md:last:pr-0" data-reveal>
              <div className="flex items-center justify-between gap-3">
                <span className="font-anton text-lg text-white">{item.years}</span>
                <Badge variant={item.current ? 'accent' : 'outline'}>{item.current ? 'En cours' : 'Obtenu'}</Badge>
              </div>
              <h3 className="mt-4 font-anton text-xl uppercase leading-tight tracking-wide text-white">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold text-blue-300">{item.place}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Formation
