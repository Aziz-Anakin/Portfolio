import { SKILLS } from '../data/skills'
import SectionHeading from '../components/SectionHeading.jsx'
import mark from '../assets/marks/one-piece-3.svg'

// Vitesse commune à toutes les rangées (secondes par logo).
// La durée est proportionnelle au nombre de logos → même vitesse en px/s partout.
const SECONDS_PER_ITEM = 2.6
// Minimum de logos par moitié pour qu'une rangée remplisse toujours la largeur (pas de trou).
const MIN_ITEMS = 12

function MarqueeRow({ label, items, reverse = false }) {
  const reps = Math.max(1, Math.ceil(MIN_ITEMS / items.length))
  const base = Array.from({ length: reps }, () => items).flat()
  const loop = [...base, ...base]
  const duration = `${base.length * SECONDS_PER_ITEM}s`

  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
        {label}
      </p>
      <div className="relative overflow-hidden">
        {/* Fades on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

        <div
          style={{ animationDuration: duration }}
          className={`flex w-max items-start py-2 will-change-transform ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          {loop.map((s, i) => (
            <a
              key={s.name + i}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              title={s.name}
              aria-label={s.name}
              className="flex shrink-0 flex-col items-center gap-2.5 mr-10 sm:mr-14"
            >
              <img
                src={s.logo}
                alt={s.name}
                loading="lazy"
                className="skill-logo h-10 w-10 object-contain transition-all duration-300 hover:scale-125"
              />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {s.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Compétences" mark={mark} />

        <div className="space-y-10">
          <MarqueeRow label="Développement" items={SKILLS.dev} />
          <MarqueeRow label="Outils" items={SKILLS.tools} reverse />
          <MarqueeRow label="Création" items={SKILLS.creation} />
        </div>
      </div>
    </section>
  )
}

export default Skills
