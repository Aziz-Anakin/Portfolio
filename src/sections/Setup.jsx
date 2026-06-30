import { SETUP } from '../data/setup'
import SectionHeading from '../components/SectionHeading.jsx'
import mark from '../assets/marks/one-piece-6.svg'

function Setup() {
  return (
    <section id="setup" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Stack & setup" mark={mark} />

        <p className="mb-10 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-400">
          Les outils que j'utilise au quotidien pour développer.
        </p>

        <div className="space-y-10">
          {SETUP.map((group) => (
            <div key={group.label} className="reveal" data-reveal>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {group.label}
              </p>

              <div className="flex flex-wrap gap-8 sm:gap-10">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex flex-col items-center gap-2.5 w-20 text-center"
                  >
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.name}
                        loading="lazy"
                        className={`skill-logo h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110 ${item.invert ? 'dark:invert' : ''}`}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-lg font-bold text-white transition-transform duration-300 group-hover:scale-110"
                      >
                        {item.name.charAt(0)}
                      </span>
                    )}
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Setup
