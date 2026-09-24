import photo from '../assets/images/photo.jpg'
import DepthText, { DepthImage } from '../components/DepthText.jsx'
import ShinyText from '../components/ShinyText.jsx'

function Home({ onOpenCv }) {
  return (
    <section id="home" className="relative min-h-[calc(100dvh-4.75rem)] flex items-center py-16 sm:py-20 bg-transparent reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* ── Text ── */}
          <div className="flex-1 text-center md:text-left">
            <div>
              <DepthText
                text="Mdoughy Yanis"
                as="h1"
                layers={30}
                depth={2.2}
                faceColor="var(--depth-name-face)"
                depthColor="var(--depth-name-back)"
                fontSize="clamp(3rem, 9vw, 4.5rem)"
                className="font-anton uppercase"
              />
            </div>

            <a
              href="https://www.epitech.eu/ecole-informatique-paris/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2.5 mt-5 text-base font-semibold text-slate-600 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors reveal revealDelay2"
              data-reveal
            >
              <img
                src="https://www.epitech.eu/wp-content/themes/epitech/assets/favicon/favicon-32x32.png"
                alt="Epitech"
                className="w-8 h-8 rounded object-contain"
                onError={(e) => { e.currentTarget.src = 'https://yt3.googleusercontent.com/4dwyYBfUJPi-2Twhf5yHUMEQrniqJfLDMxzGbqqqrqhMC3DH3dfbytt-J7u_isYKTo7yoQNSDw=s900-c-k-c0x00ffffff-no-rj' }}
              />
              Epitech Paris
            </a>

            <p className="mt-3 text-sm text-slate-600 dark:text-white font-medium reveal revealDelay2" data-reveal>
              📍 Paris, Île-de-France — 18ème
            </p>

            <div className="mt-5 flex items-center gap-2 reveal revealDelay2" data-reveal>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" aria-hidden="true" />
              <ShinyText text="Disponible · stage avril – juillet 2027" color="#3b82f6" shineColor="#a78bfa" speed={3} delay={1} />
            </div>

            <p className="mt-3 text-sm text-slate-600 dark:text-white font-medium reveal revealDelay2" data-reveal>
              À la recherche d'un stage de 4 mois en développement Web / Full Stack. Disponible pour relever de nouveaux défis au sein d'une équipe tech.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8 reveal revealDelay3" data-reveal>
              <a
                href="#projects"
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-white text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 transition-all duration-200"
              >
                Me contacter
              </a>
              <button
                type="button"
                onClick={onOpenCv}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-white text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                Voir / Télécharger mon CV
              </button>
            </div>
          </div>

          {/* ── Photo ── */}
          <div className="flex-shrink-0 reveal revealDelay2 group" data-reveal>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-slate-900/20 blur-3xl scale-75 opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700 ease-out -z-10" />
              <DepthImage
                src={photo}
                alt="Photo de profil Yanis Mdoughy"
                faceColor="var(--depth-name-face)"
                depthColor="var(--depth-name-back)"
                phase={Math.PI}
                imgClassName="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 object-top"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Home
