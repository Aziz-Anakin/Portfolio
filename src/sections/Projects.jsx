import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import GlareHover from '../components/GlareHover.jsx'
import Lightbox from '../components/Lightbox.jsx'
import mark from '../assets/marks/one-piece-1.svg'
import tasklyShot1 from '../assets/projects/taskly/taskly.png'
import tasklyShot2 from '../assets/projects/taskly/taskly2.png'
import ecomapShot1 from '../assets/projects/ecomap/ecomap.png'
import ecomapShot2 from '../assets/projects/ecomap/ecomap2.png'
import ecomapShot3 from '../assets/projects/ecomap/ecomap3.png'
import showeatherShot1 from '../assets/projects/showeather/showeather.png'
import showeatherShot2 from '../assets/projects/showeather/showeather2.png'
import pylizaShot1 from '../assets/projects/pyliza/pyliza.png'
import pylizaShot2 from '../assets/projects/pyliza/pyliza2.png'
import pylizaShot3 from '../assets/projects/pyliza/pyliza3.png'
import pylizaShot4 from '../assets/projects/pyliza/pyliza4.png'
import pylizaShot5 from '../assets/projects/pyliza/pyliza5.png'
import pylizaShot6 from '../assets/projects/pyliza/pyliza6.png'

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

// Logos des technos (devicon). `invert` pour les logos monochromes noirs → blancs en mode nuit.
const TAG_LOGOS = {
  TypeScript:   { src: `${DEV}/typescript/typescript-original.svg` },
  Rust:         { src: `${DEV}/rust/rust-original.svg`, invert: true },
  Python:       { src: `${DEV}/python/python-original.svg` },
  Streamlit:    { src: `${DEV}/streamlit/streamlit-original.svg` },
  'Node.js':    { src: `${DEV}/nodejs/nodejs-original.svg` },
  Express:      { src: `${DEV}/express/express-original.svg`, invert: true },
  React:        { src: `${DEV}/react/react-original.svg` },
  MongoDB:      { src: `${DEV}/mongodb/mongodb-original.svg` },
  Vite:         { src: `${DEV}/vitejs/vitejs-original.svg` },
  Docker:       { src: `${DEV}/docker/docker-original.svg` },
}

const projects = [
  {
    id: 'RustChat',
    title: 'RustChat',
    description: 'Application de chat en terminal écrite en Rust, permettant la messagerie en temps réel entre plusieurs utilisateurs via TCP (serveur multi-clients, threads et std lib uniquement).',
    link: 'https://github.com/Aziz-Anakin/RustChat',
    tags: ['Rust', 'TCP', 'CLI'],
  },
  {
    id: 'Ecomap',
    title: 'EcoMap',
    description: "Extension Chrome qui enrichit Google Maps en affichant un éco-score des communes, calculé à partir de la qualité de l'air et des données des sols.",
    link: 'https://github.com/Aziz-Anakin/Ecomap',
    tags: ['TypeScript', 'Chrome Extension'],
    screenshots: [ecomapShot1, ecomapShot3, ecomapShot2],
  },
  {
    id: 'Showeather',
    title: 'Showeather',
    description: "Application web météo minimaliste qui affiche en temps réel les conditions d'une ville (température, humidité, vent, visibilité) via l'API OpenWeatherMap, dans une interface épurée.",
    link: 'https://github.com/Aziz-Anakin/Showeather',
    tags: ['React', 'Vite', 'API météo'],
    screenshots: [showeatherShot1, showeatherShot2],
  },
  {
    id: 'PyLiza',
    title: 'PyLiza',
    description: "Bot Discord pédagogique pour apprendre Python : leçons structurées, quiz interactifs et assistant IA local (Ollama / Phi-3) pour répondre aux questions, le tout conteneurisé avec Docker.",
    link: 'https://github.com/Aziz-Anakin/Pyliza',
    tags: ['Node.js', 'Discord.js', 'Ollama', 'Docker'],
    screenshots: [pylizaShot1, pylizaShot2, pylizaShot3, pylizaShot4, pylizaShot5, pylizaShot6],
  },
  {
    id: 'Tardis',
    title: 'Tardis',
    description: 'Projet de data science complet qui analyse et prédit les retards SNCF — nettoyage des données, modélisation et dashboard Streamlit interactif.',
    link: 'https://github.com/Aziz-Anakin/Tardis',
    tags: ['Python', 'Data Science', 'Streamlit'],
  },
  {
    id: 'NextBuy',
    title: 'NextBuy',
    description: "Dashboard interactif utilisant Streamlit et XGBoost pour prédire si un client rachètera un produit en se basant sur son historique d'achat.",
    link: 'https://github.com/Aziz-Anakin/NextBuy',
    tags: ['Python', 'XGBoost', 'ML'],
  },
  {
    id: 'Hack-and-Juice',
    title: 'Hack & Juice',
    description: 'Exploration des vulnérabilités courantes des applications web par la pratique sur le projet OWASP Juice Shop.',
    link: 'https://github.com/Aziz-Anakin/Hack-and-Juice',
    tags: ['Cybersécurité', 'OWASP'],
    dates: '01/12/2025 → 19/12/2025',
  },
  {
    id: 'Taskly',
    title: 'Taskly',
    description: "Application full-stack de gestion de tâches inscription, authentification et CRUD complet des tâches (titre, description, échéance, statut) dans une interface épurée.",
    link: 'https://github.com/Aziz-Anakin/Taskly',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    dates: '03/11/2025 → 28/11/2025',
    screenshots: [tasklyShot1, tasklyShot2],
  },
]

// Loupe — utilisée pour signaler l'aperçu cliquable et dans le survol des vignettes.
function MagnifierIcon({ className = '' }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

function Projects() {
  // null quand fermé ; { images, index, title } quand ouvert.
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="projects" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Projets" mark={mark} />

        <ul className="space-y-1">
          {projects.map((p) => (
            <li key={p.id} className="group reveal" data-reveal>
              <GlareHover
                width="100%"
                height="auto"
                background="transparent"
                borderColor="transparent"
                borderRadius="0.75rem"
                glareColor="#60a5fa"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={800}
                className="block"
              >
              <div
                className="relative flex items-start gap-4 sm:gap-6 py-6 px-4 rounded-xl
                           hover:bg-blue-50/60 dark:hover:bg-blue-950/30
                           transition-all duration-300"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {/* Lien étiré : couvre toute la carte (sauf les vignettes en z-10). */}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="after:absolute after:inset-0 after:content-[''] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    >
                      <h3 className="font-code text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {p.title}
                      </h3>
                    </a>
                    {p.dates && (
                      <span className="text-xs text-slate-400 dark:text-slate-500">{p.dates}</span>
                    )}
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {p.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((tag) => {
                      const logo = TAG_LOGOS[tag]
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300"
                        >
                          {logo && (
                            <img
                              src={logo.src}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              className={`h-4 w-4 object-contain ${logo.invert ? 'dark:invert' : ''}`}
                            />
                          )}
                          {tag}
                        </span>
                      )
                    })}
                  </div>

                  {/* Aperçus cliquables (z-10 pour passer au-dessus du lien étiré) */}
                  {p.screenshots?.length > 0 && (
                    <div className="relative z-10 mt-4">
                      <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        <MagnifierIcon />
                        Aperçus — cliquer pour agrandir
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {p.screenshots.map((src, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setLightbox({ images: p.screenshots, index: i, title: p.title })}
                            aria-label={`Agrandir l'aperçu ${i + 1} de ${p.title}`}
                            className="group/shot relative h-20 w-32 sm:h-24 sm:w-40 shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            <img
                              src={src}
                              alt={`Aperçu ${i + 1} de ${p.title}`}
                              loading="lazy"
                              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/shot:scale-105"
                            />
                            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/0 text-white opacity-0 transition-all duration-300 group-hover/shot:bg-slate-900/45 group-hover/shot:opacity-100">
                              <MagnifierIcon className="h-5 w-5" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <span className="pt-1 text-slate-300 dark:text-slate-600 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              </GlareHover>
            </li>
          ))}
        </ul>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}

export default Projects
