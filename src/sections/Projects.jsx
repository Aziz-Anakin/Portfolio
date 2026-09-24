import { useRef, useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import CardSwap, { Card } from '../components/CardSwap.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { AnimatePresence, motion } from 'motion/react'
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
  Python:       { src: `${DEV}/python/python-original.svg` },
  Streamlit:    { src: `${DEV}/streamlit/streamlit-original.svg` },
  'Node.js':    { src: `${DEV}/nodejs/nodejs-original.svg` },
  Express:      { src: `${DEV}/express/express-original.svg`, invert: true },
  React:        { src: `${DEV}/react/react-original.svg` },
  'Vue 3':      { src: `${DEV}/vuejs/vuejs-original.svg` },
  'Tailwind CSS': { src: `${DEV}/tailwindcss/tailwindcss-original.svg` },
  MongoDB:      { src: `${DEV}/mongodb/mongodb-original.svg` },
  Vite:         { src: `${DEV}/vitejs/vitejs-original.svg` },
  Docker:       { src: `${DEV}/docker/docker-original.svg` },
  Ollama:       { src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ollama.svg', invert: true },
  'Jupyter Notebook': { src: `${DEV}/jupyter/jupyter-original.svg` },
  Bash:         { src: `${DEV}/bash/bash-original.svg` },
  Markdown:     { src: `${DEV}/markdown/markdown-original.svg`, invert: true },
  'Burp Suite': { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/BurpSuite_Comunity_Edition.svg/250px-BurpSuite_Comunity_Edition.svg.png' },
}

const projects = [
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
    description: "Application web météo minimaliste qui affiche en temps réel les conditions d'une ville (température ressentie, humidité, vent) et les prévisions des prochains jours via l'API Open-Meteo, dans une interface épurée.",
    link: 'https://github.com/Aziz-Anakin/Showeather',
    tags: ['Vue 3', 'Vite', 'Tailwind CSS', 'Vue Bits', 'API météo'],
    screenshots: [showeatherShot1, showeatherShot2],
  },
  {
    id: 'PyLiza',
    title: 'PyLiza',
    description: "Bot Discord pédagogique pour apprendre Python : leçons structurées, quiz interactifs et assistant IA local (Ollama / Phi-3) pour répondre aux questions.",
    link: 'https://github.com/Aziz-Anakin/Pyliza',
    tags: ['Node.js', 'Discord.js', 'Ollama'],
    screenshots: [pylizaShot1, pylizaShot2, pylizaShot3, pylizaShot4, pylizaShot5, pylizaShot6],
  },
  {
    id: 'Tardis',
    title: 'Tardis',
    description: 'Projet de data science complet qui analyse et prédit les retards SNCF — nettoyage des données, modélisation et dashboard Streamlit interactif.',
    link: 'https://github.com/Aziz-Anakin/Tardis',
    tags: ['Python', 'Jupyter Notebook', 'Streamlit'],
  },
  {
    id: 'NextBuy',
    title: 'NextBuy',
    description: "Dashboard interactif utilisant Streamlit et XGBoost pour prédire si un client rachètera un produit en se basant sur son historique d'achat.",
    link: 'https://github.com/Aziz-Anakin/NextBuy',
    tags: ['Python', 'XGBoost', 'Jupyter Notebook'],
  },
  {
    id: 'Hack-and-Juice',
    title: 'Hack & Juice',
    description: 'Exploration des vulnérabilités courantes des applications web par la pratique sur le projet OWASP Juice Shop.',
    link: 'https://github.com/Aziz-Anakin/Hack-and-Juice',
    tags: ['Cybersécurité', 'OWASP', 'Burp Suite', 'Bash', 'Markdown'],
    dates: '01/12/2025 → 19/12/2025',
  },
  {
    id: 'Taskly',
    title: 'Taskly',
    description: "Application full-stack de gestion de tâches inscription, authentification et CRUD complet des tâches (titre, description, échéance, statut) dans une interface épurée.",
    link: 'https://github.com/Aziz-Anakin/Taskly',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    dates: '03/11/2025 → 28/11/2025',
    screenshots: [tasklyShot1, tasklyShot2],
  },
]

// Teinte de la couverture générée des projets sans capture.
const COVER_HUES = {
  Tardis: 'from-rose-600/40 via-orange-500/20',
  NextBuy: 'from-emerald-500/40 via-teal-500/20',
  'Hack-and-Juice': 'from-lime-500/35 via-yellow-500/15',
}

const pad = (n) => String(n).padStart(2, '0')

function GitHubIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

// Couverture générée pour les projets sans capture : halo coloré, grille et titre en contour.
function GeneratedCover({ project, className = 'aspect-[16/10] rounded-2xl border border-white/10' }) {
  const hue = COVER_HUES[project.id] || 'from-blue-600/40 via-indigo-500/20'
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${hue} to-slate-950 ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <span
        aria-hidden="true"
        className="relative select-none px-4 text-center font-anton text-5xl uppercase tracking-wide text-transparent transition-transform duration-500 group-hover:scale-105 sm:text-6xl"
        style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}
      >
        {project.title}
      </span>
      <span className="absolute bottom-3 right-3 flex gap-2">
        {project.tags.map((tag) => TAG_LOGOS[tag] && (
          <img
            key={tag}
            src={TAG_LOGOS[tag].src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`h-7 w-7 rounded-md bg-slate-950/60 p-1 ${TAG_LOGOS[tag].invert ? 'invert' : ''}`}
          />
        ))}
      </span>
    </div>
  )
}


// Visuel d'une carte de la pile : fenêtre de navigateur avec la 1re capture, ou couverture générée.
function CardFace({ project }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-slate-900 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-md bg-white/5 px-3 py-0.5 font-code text-[11px] text-white">
          github.com/Aziz-Anakin/{project.id}
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        {project.screenshots?.length ? (
          <img src={project.screenshots[0]} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover object-top" />
        ) : (
          <GeneratedCover project={project} className="h-full" />
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-4 pb-3 pt-10 font-anton text-2xl uppercase tracking-wide text-white">
          {project.title}
        </span>
      </div>
    </div>
  )
}

// Détails du projet au premier plan de la pile.
function ProjectDetails({ project, index, onNext, onOpenShots }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 font-code text-xs">
          <span className="font-bold text-blue-400">{pad(index + 1)} / {pad(projects.length)}</span>
          {project.dates && <span className="text-white">{project.dates}</span>}
        </div>

        <h3 className="mt-3 font-anton text-5xl uppercase tracking-wide text-white sm:text-6xl">{project.title}</h3>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => {
            const logo = TAG_LOGOS[tag]
            return (
              <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white">
                {logo && <img src={logo.src} alt="" aria-hidden="true" loading="lazy" className={`h-3.5 w-3.5 object-contain ${logo.invert ? 'invert' : ''}`} />}
                {tag}
              </span>
            )
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500"
          >
            <GitHubIcon className="h-4 w-4" />
            Voir le code
          </a>
          {project.screenshots?.length > 0 && (
            <button
              type="button"
              onClick={onOpenShots}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60"
            >
              Captures ({project.screenshots.length})
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:text-blue-400"
          >
            Projet suivant
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function Projects() {
  const swapRef = useRef(null)
  const [active, setActive] = useState(0)
  // null quand fermé ; { images, index, title } quand ouvert.
  const [lightbox, setLightbox] = useState(null)

  const openShots = (i) => {
    const p = projects[i]
    if (p.screenshots?.length) setLightbox({ images: p.screenshots, index: 0, title: p.title })
  }

  return (
    <section id="projects" className="py-20 sm:py-24 bg-transparent reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Projets" mark={mark} />

        <div className="grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Pile de cartes React Bits « Card Swap » (la carte de devant tombe et repasse derrière) */}
          <div
            className="relative order-1 h-[330px] sm:h-[480px] lg:order-2 lg:h-[560px]"
            style={{ clipPath: 'inset(-400px -400px 0 -400px)' }}
          >
            <div className="absolute bottom-6 left-0 origin-bottom-left scale-[0.62] sm:scale-[0.9] lg:scale-100">
              <CardSwap
                ref={swapRef}
                width={460}
                height={330}
                cardDistance={34}
                verticalDistance={36}
                delay={5000}
                skewAmount={5}
                onChange={setActive}
                onCardClick={openShots}
              >
                {projects.map((p) => (
                  <Card key={p.id} customClass="cursor-pointer overflow-hidden shadow-2xl shadow-black/60">
                    <CardFace project={p} />
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>

          <div className="order-2 lg:order-1">
            <ProjectDetails
              project={projects[active]}
              index={active}
              onNext={() => swapRef.current?.next()}
              onOpenShots={() => openShots(active)}
            />
          </div>
        </div>
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
