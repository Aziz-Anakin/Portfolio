import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { PROJECTS } from '../data/projects'
import SlideFrame from '../components/SlideFrame.jsx'
import DriftWall from '../components/DriftWall.jsx'
import TechList from '../components/TechList.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { ArrowUpRight, CloseIcon, GitHubIcon } from '../components/Icons.jsx'
import useModal from '../hooks/useModal'
import useMediaQuery from '../hooks/useMediaQuery.js'


// ── Colonne de texte d'une étude de cas ──────────────────────────────────────
function ProjectInfo({ project, onOpenShots }) {
  const shots = project.visual.type === 'shots' ? project.visual.images.length : 0

  return (
    <div>
      <h3 className="t-title">{project.title}</h3>
      <p className="t-lead mt-5 max-w-lg">{project.pitch}</p>

      <dl className="mt-7 max-w-lg space-y-4">
        {[...(project.role ? [{ label: 'Mon rôle', text: project.role }] : []), ...project.points].map((point) => (
          <div key={point.label} className="grid gap-x-5 gap-y-1 sm:grid-cols-[8.5rem_1fr]">
            <dt className="t-label sm:pt-[0.3rem]">{point.label}</dt>
            <dd className="t-small">{point.text}</dd>
          </div>
        ))}
      </dl>

      <TechList names={project.stack} className="mt-7" />

      <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2">
        <a href={project.links.code} target="_blank" rel="noreferrer" className="btn btn-primary">
          <GitHubIcon />
          Code
        </a>
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noreferrer" className="link">
            Voir la démo
            <ArrowUpRight size={14} />
          </a>
        )}
        {shots > 1 && (
          <button type="button" onClick={() => onOpenShots(0)} className="link">
            {shots} captures
          </button>
        )}
      </div>
    </div>
  )
}

// ── Visuel d'une étude de cas : captures, pipeline ou liste ──────────────────
function ProjectVisual({ project, onOpenShots }) {
  const { visual } = project

  if (visual.type === 'shots') {
    const [lead, ...rest] = visual.images
    return (
      <div>
        <button
          type="button"
          onClick={() => onOpenShots(0)}
          aria-label={`Agrandir la capture de ${project.title}`}
          className="group flex aspect-[16/11] w-full cursor-zoom-in items-center justify-center"
        >
          <img
            src={lead}
            alt={`Capture d’écran de ${project.title}`}
            decoding="async"
            draggable={false}
            className="max-h-full max-w-full rounded-xl object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </button>

        {rest.length > 0 && (
          <ul className="mt-5 flex justify-center gap-3">
            {rest.slice(0, 4).map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => onOpenShots(i + 1)}
                  aria-label={`Voir la capture ${i + 2} de ${project.title}`}
                  className="block cursor-zoom-in overflow-hidden rounded-md transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <img src={src} alt="" decoding="async" draggable={false} className="h-12 w-[4.5rem] object-cover object-top sm:h-14 sm:w-20" />
                </button>
              </li>
            ))}
            {rest.length > 4 && (
              <li className="flex items-center">
                <button type="button" onClick={() => onOpenShots(5)} className="t-data flex h-12 min-w-11 cursor-pointer items-center justify-center px-2 sm:h-14">
                  +{rest.length - 4}
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    )
  }

  if (visual.type === 'pipeline') {
    return (
      <ol className="ml-1.5 border-l border-white">
        {visual.steps.map((step) => (
          <li key={step.title} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
            <span aria-hidden="true" className="absolute -left-[6.5px] top-1 h-3 w-3 rounded-full bg-white" />
            <p className="t-label">{step.file}</p>
            <p className="t-heading mt-2">{step.title}</p>
            <p className="t-data mt-2">→ {step.output}</p>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <div>
      <p className="t-label">{visual.title}</p>
      <ol className="mt-6 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
        {visual.items.map((item) => (
          <li key={item} className="flex items-baseline gap-4">
            <span className="t-text font-medium">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ── Étude de cas en plein écran ──────────────────────────────────────────────
// Flèches gauche / droite (clavier ou boutons) pour passer d'un projet à l'autre.
function ProjectDialog({ index, onClose, onChange }) {
  const total = PROJECTS.length
  const project = PROJECTS[index]
  // null quand fermée ; index de la capture quand ouverte.
  const [shot, setShot] = useState(null)
  const paused = shot !== null

  const go = useCallback((delta) => onChange((index + delta + total) % total), [index, total, onChange])

  useModal(onClose, !paused)
  useEffect(() => {
    if (paused) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go, paused])

  const icon = 'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 ease-out'

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Projet ${project.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] flex flex-col bg-[var(--bg)]"
    >
      <div className="container-page flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <div className="flex items-center">
          <button type="button" onClick={() => go(-1)} aria-label="Projet précédent" className={`${icon} hover:-translate-x-1`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Projet suivant" className={`${icon} hover:translate-x-1`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
        <button type="button" onClick={onClose} aria-label="Fermer le projet" className={`${icon} hover:rotate-90`}>
          <CloseIcon />
        </button>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="container-page grid min-h-full items-center gap-10 py-8 lg:grid-cols-12 lg:gap-8"
          >
            <div className="lg:col-span-5">
              <ProjectInfo project={project} onOpenShots={setShot} />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ProjectVisual project={project} onOpenShots={setShot} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {paused && <Lightbox images={project.visual.images} index={shot} title={project.title} onClose={() => setShot(null)} />}
    </motion.div>,
    document.body,
  )
}

// ── Slide Projets ────────────────────────────────────────────────────────────
// Le mur (React Bits « Drift Wall ») est centré : une tuile colorée par projet, avec son nom,
// sa description et une flèche pour dire « cliquer ». Un clic ouvre l'étude de cas.
// Téléphone : pas de masque ni de 3D sur le mur, ce sont eux qui font saccader le défilement.
const FLAT = { maskImage: 'none', WebkitMaskImage: 'none', perspective: 'none' }

function Projects() {
  const wide = useMediaQuery('(min-width: 1024px)')
  const narrow = useMediaQuery('(max-width: 639px)')
  const [open, setOpen] = useState(null)

  const tiles = useMemo(() => PROJECTS.map((p, index) => ({ title: p.title, text: p.pitch, color: p.color, index })), [])
  const onClick = useCallback((tile) => setOpen(tile.index), [])

  return (
    <SlideFrame title="Projets">
      {/* Bords gauche et droit fondus : le mur se dissout au lieu d'être coupé net */}
      <div className="mx-auto h-[min(72vh,44rem)] min-h-[24rem] w-full max-w-[72rem] sm:[mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
       <div className="h-full w-full sm:[mask-image:linear-gradient(180deg,transparent,#000_8%,#000_92%,transparent)]">
        <DriftWall
          items={tiles}
          columns={narrow ? 1 : wide ? 3 : 2}
          tileWidth={narrow ? 300 : wide ? 340 : 280}
          tileHeight={narrow ? 210 : wide ? 230 : 220}
          gap={wide ? 18 : 14}
          radius={16}
          perspective={1500}
          depth={narrow ? 0 : 70}
          tilt={narrow ? 0 : 4}
          turn={0}
          speed={26}
          parallax={0.4}
          lift={narrow ? 0 : 44}
          fade={0.3}
          style={narrow ? FLAT : undefined}
          dim={1}
          overlayColor="transparent"
          paused={open !== null}
          onItemClick={onClick}
        />
       </div>
      </div>

      <AnimatePresence>
        {open !== null && <ProjectDialog index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
      </AnimatePresence>
    </SlideFrame>
  )
}

export default Projects
