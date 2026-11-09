import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import Section from '../components/Section.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Spawn from '../components/Spawn.jsx'
import TechBadges from '../components/TechBadges.jsx'
import ProjectDialog from '../components/ProjectDialog.jsx'

// Visuel provisoire d'un projet sans capture : dégradé du site et nom du projet (SVG en data URI).
const placeholder = (title) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="920" height="580"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f45ff"/><stop offset=".55" stop-color="#7c3aed"/><stop offset="1" stop-color="#e44fb0"/></linearGradient></defs><rect width="920" height="580" fill="url(#g)"/><text x="460" y="310" text-anchor="middle" font-family="Impact, Arial Narrow, sans-serif" font-size="88" fill="#fff" letter-spacing="4">${title.toUpperCase().replace(/&/g, '&amp;')}</text></svg>`,
  )}`

// Carte d'un projet : un seul bouton (toute la carte est cliquable, au clavier comme à la souris). Chaque carte
// montre la même chose dans le même ordre : capture, type, nom, résumé, technologies, appel à l'action.
function ProjectCard({ project, image, count, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex h-full w-full cursor-pointer flex-col border border-line bg-panel text-left transition-colors duration-200 hover:border-pink focus-visible:border-pink"
    >
      <span className="block aspect-[16/10] overflow-hidden border-b border-line bg-ink">
        <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]" />
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bright">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-pink" />
          {project.kind}
        </span>
        <span className="mt-3 block font-anton text-3xl uppercase leading-none tracking-wide md:text-4xl">{project.title}</span>
        <span className="mt-3 line-clamp-3 block text-base leading-relaxed">{project.pitch}</span>
        <span className="mt-4 block">
          <TechBadges names={project.stack.slice(0, 4)} />
          {project.stack.length > 4 && <span className="mt-2 block font-mono text-xs uppercase tracking-wider text-bright">+ {project.stack.length - 4} autres technologies</span>}
        </span>
        <span className="mt-auto flex items-center justify-between gap-3 pt-5 font-mono text-xs font-bold uppercase tracking-widest">
          <span>
            Voir le projet
            <span className="sr-only">
              {' '}
              {project.title}, {count} capture{count > 1 ? 's' : ''}
            </span>
          </span>
          <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" />
        </span>
      </span>
    </button>
  )
}

// Les projets : une grille de cartes (une colonne sur téléphone, deux ensuite) ; un clic ouvre la fenêtre du projet
// (captures, fiche, projet précédent ou suivant). Rien ne défile ni ne change tout seul.
function Projects() {
  const [open, setOpen] = useState(null)
  const images = useMemo(
    () => PROJECTS.map((p) => (p.visual?.type === 'shots' && p.visual.images.length ? p.visual.images : [placeholder(p.title)])),
    [],
  )
  const n = PROJECTS.length
  const step = (d) => setOpen((i) => (i + d + n) % n)

  return (
    <Section id="projects">
      <SectionTitle kicker="Projets" poke="kyogre" level={2}>Projets</SectionTitle>
      <p className="-mt-4 mb-8 max-w-2xl text-lg leading-relaxed md:-mt-8">
        {n} projets web. Chaque projet s’ouvre dans une fenêtre avec ses captures d’écran, sa fiche et ses technologies.
      </p>
      <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {PROJECTS.map((project, i) => (
          <li key={project.id}>
            <Spawn delay={(i % 2) * 0.15} className="h-full">
              <ProjectCard project={project} image={images[i][0]} count={images[i].length} onOpen={() => setOpen(i)} />
            </Spawn>
          </li>
        ))}
      </ul>

      {open !== null && (
        <ProjectDialog
          project={PROJECTS[open]}
          images={images[open]}
          index={open}
          total={n}
          prevTitle={PROJECTS[(open - 1 + n) % n].title}
          nextTitle={PROJECTS[(open + 1) % n].title}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onClose={() => setOpen(null)}
        />
      )}
    </Section>
  )
}

export default Projects
