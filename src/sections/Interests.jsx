import { INTERESTS } from '../data/interests'
import SectionHeading from '../components/SectionHeading.jsx'
import InterestIcon from '../components/InterestIcons.jsx'
import mark from '../assets/marks/one-piece-1.svg'

function Interests() {
  return (
    <section id="interests" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Centres d'intérêt" mark={mark} />

        <div className="space-y-12">
          {INTERESTS.map((cat) => (
            <div key={cat.id} className="reveal" data-reveal>
              {/* En-tête de catégorie */}
              <div className="mb-5">
                <h3 className="font-code text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{cat.blurb}</p>
              </div>

              {/* Galerie de visuels (style Steam) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {cat.items.map((item) => (
                  <figure
                    key={item.name}
                    className="group relative overflow-hidden rounded-xl aspect-[16/9] ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:-translate-y-1 hover:ring-blue-400 dark:hover:ring-blue-500 hover:shadow-lg"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                        <InterestIcon name={cat.icon} className="h-8 w-8 opacity-90" />
                      </div>
                    )}
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-3 py-2 text-xs sm:text-sm font-semibold text-white">
                      {item.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Interests
