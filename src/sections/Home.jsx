import photo from '../assets/images/photo.jpg'
import cvPdf from '../assets/documents/cv-yanis-mdoughy.pdf'

function Home() {
  return (
    <section id="home" className="min-h-[calc(100dvh-3.5rem)] flex items-center py-16 sm:py-20 bg-transparent reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* ── Text ── */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="gradient-text font-anton text-5xl sm:text-6xl lg:text-7xl uppercase tracking-wide leading-none">
              Mdoughy Yanis
            </h1>

            <a
              href="https://www.epitech.eu/ecole-informatique-paris/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 mt-5 text-base font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors reveal revealDelay2"
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

            <p className="mt-3 text-sm text-slate-400 font-medium reveal revealDelay2" data-reveal>
              📍 Paris, Île-de-France — 18ème
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8 reveal revealDelay3" data-reveal>
              <a
                href="#projects"
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-slate-900/25 dark:shadow-white/10 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 dark:hover:shadow-white/25 transition-all duration-200"
              >
                Voir mes projets
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-900/15 dark:shadow-white/5 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg hover:-translate-y-0.5 dark:hover:shadow-white/20 transition-all duration-200"
              >
                Me contacter
              </a>
              <a
                href={cvPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 shadow-md shadow-slate-900/15 dark:shadow-white/5 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg hover:-translate-y-0.5 dark:hover:shadow-white/20 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Télécharger CV
              </a>
            </div>
          </div>

          {/* ── Photo ── */}
          <div className="flex-shrink-0 reveal revealDelay2 group" data-reveal>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-slate-900/20 blur-3xl scale-75 opacity-60 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700 ease-out -z-10" />
              <img
                src={photo}
                alt="Photo de profil Yanis Mdoughy"
                className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full object-cover object-top
                           shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                           transition-all duration-500 ease-out
                           group-hover:scale-[1.04] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(59,130,246,0.2)]
                           group-hover:brightness-105 cursor-pointer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Home
