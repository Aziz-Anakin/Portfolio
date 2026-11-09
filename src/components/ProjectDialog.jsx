import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import TechBadges from './TechBadges.jsx'
import { Button } from './ui/button.jsx'

const pad = (n) => String(n).padStart(2, '0')

// Fenêtre d'un projet, construite sur l'élément natif <dialog> (showModal) : le navigateur gère le piège à focus,
// l'inertie du reste de la page, la touche Échap et le retour du focus sur la carte qui l'a ouverte.
// Contenu : visionneuse de captures (grande image, flèches, compteur annoncé, vignettes), puis fiche (résumé,
// rôle, points numérotés, technologies, liens), puis navigation vers les projets voisins.
// Accessibilité : nom (aria-labelledby) et description (aria-describedby), boutons de 44 px minimum, focus visible,
// aucune animation automatique, flèches ← → pour changer de capture.
function ProjectDialog({ project, images, index, total, prevTitle, nextTitle, onPrev, onNext, onClose }) {
  const dialogRef = useRef(null)
  const bodyRef = useRef(null)
  const [shot, setShot] = useState(0)
  const many = images.length > 1
  const id = `project-${project.id}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    // La page derrière ne défile pas tant que la fenêtre est ouverte.
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [])

  // Nouveau projet : première capture, haut de la fiche.
  useEffect(() => {
    setShot(0)
    bodyRef.current?.scrollTo({ top: 0 })
  }, [project.id])

  const go = (d) => setShot((i) => (i + d + images.length) % images.length)

  const onKeyDown = (e) => {
    if (!many || e.altKey || e.ctrlKey || e.metaKey) return
    if (e.key === 'ArrowLeft') go(-1)
    else if (e.key === 'ArrowRight') go(1)
  }

  // Un clic sur le fond (le <dialog> lui-même) ferme la fenêtre.
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) dialogRef.current.close()
  }

  const square = 'flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-ink text-white transition-colors hover:border-pink hover:bg-azure'

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-pitch`}
      onClose={onClose}
      onClick={onBackdrop}
      onKeyDown={onKeyDown}
      className="m-auto max-h-[96dvh] w-[calc(100vw-1rem)] max-w-[84rem] flex-col overflow-hidden border border-line bg-panel p-0 text-white open:flex motion-safe:animate-zoom-in backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
    >
      <div aria-hidden="true" className="h-1 shrink-0 bg-azure" />
      <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-widest text-bright">
            {project.kind} · Projet {index + 1} sur {total}
          </p>
          <h3 id={`${id}-title`} className="mt-1 break-words font-anton text-4xl uppercase leading-none tracking-wide md:text-5xl">
            {project.title}
          </h3>
        </div>
        <button type="button" autoFocus onClick={() => dialogRef.current.close()} aria-label="Fermer la fenêtre du projet" className={square}>
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      <div ref={bodyRef} className="min-h-0 flex-auto overflow-y-auto overscroll-contain">
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <section aria-label={`Captures de ${project.title}`} className="border-b border-line p-4 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-line bg-ink">
              <img key={images[shot]} src={images[shot]} alt={`Capture ${shot + 1} sur ${images.length} du projet ${project.title}`} className="h-full w-full object-contain motion-safe:animate-fade-in" />
              {many && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Capture précédente" className={`${square} absolute left-2 top-1/2 -translate-y-1/2`}>
                    <ChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => go(1)} aria-label="Capture suivante" className={`${square} absolute right-2 top-1/2 -translate-y-1/2`}>
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            {many && (
              <>
                <p aria-live="polite" className="mt-3 font-mono text-xs uppercase tracking-widest">
                  Capture {shot + 1} sur {images.length}
                </p>
                <ul className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <li key={src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setShot(i)}
                        aria-label={`Afficher la capture ${i + 1}`}
                        aria-current={i === shot ? 'true' : undefined}
                        className={`block h-14 w-24 overflow-hidden border-2 bg-ink transition-colors ${i === shot ? 'border-pink' : 'border-line hover:border-bright'}`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover object-top" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section aria-label={`Fiche de ${project.title}`} className="p-4 sm:p-6 lg:p-8">
            <p id={`${id}-pitch`} className="text-lg leading-relaxed">
              {project.pitch}
            </p>
            {project.role && <p className="mt-4 border-l-2 border-pink pl-3 text-sm leading-relaxed text-bright">{project.role}</p>}
            {project.points?.length > 0 && (
              <ol className="mt-6 space-y-5">
                {project.points.map((point, i) => (
                  <li key={point.label} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span aria-hidden="true" className="font-anton text-xl leading-none text-pink">
                      {pad(i + 1)}
                    </span>
                    <span className="text-sm leading-relaxed">
                      <strong className="mb-1 block font-mono text-xs font-bold uppercase tracking-wider text-bright">{point.label}</strong>
                      {point.text}
                    </span>
                  </li>
                ))}
              </ol>
            )}
            <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-bright">Technologies</h4>
            <TechBadges names={project.stack} className="mt-3" />
            {(project.links.demo || project.links.code) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.demo && (
                  <Button asChild>
                    <a href={project.links.demo} target="_blank" rel="noreferrer">
                      Voir la démo <ArrowUpRight size={16} aria-hidden="true" />
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </Button>
                )}
                {project.links.code && (
                  <Button asChild variant={project.links.demo ? 'outline' : 'default'}>
                    <a href={project.links.code} target="_blank" rel="noreferrer">
                      Code source <ArrowUpRight size={16} aria-hidden="true" />
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </Button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {total > 1 && (
        <nav aria-label="Autres projets" className="grid shrink-0 grid-cols-2 border-t border-line font-mono text-xs uppercase tracking-widest">
          <button type="button" onClick={onPrev} className="flex min-h-14 items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-azure sm:px-6">
            <ChevronLeft size={18} aria-hidden="true" className="shrink-0" />
            <span className="min-w-0">
              <span className="block text-bright">Projet précédent</span>
              <span className="block truncate">{prevTitle}</span>
            </span>
          </button>
          <button type="button" onClick={onNext} className="flex min-h-14 items-center justify-end gap-3 border-l border-line px-4 py-3 text-right transition-colors hover:bg-azure sm:px-6">
            <span className="min-w-0">
              <span className="block text-bright">Projet suivant</span>
              <span className="block truncate">{nextTitle}</span>
            </span>
            <ChevronRight size={18} aria-hidden="true" className="shrink-0" />
          </button>
        </nav>
      )}
    </dialog>
  )
}

export default ProjectDialog
