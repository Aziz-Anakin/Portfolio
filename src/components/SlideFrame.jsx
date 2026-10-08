import Reveal from './Reveal.jsx'

// Cadre commun à toutes les slides : le titre toujours au même endroit (en haut à gauche),
// et le contenu centré dans la hauteur restante.
// `bleed` laisse le contenu aller d'un bord à l'autre de l'écran.
function SlideFrame({ title, bleed = false, children }) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="container-page flex items-end justify-between gap-6 pt-[clamp(0.25rem,2.5vh,1.75rem)]">
        <Reveal as="h2" y={16} className="t-title">
          {title}
        </Reveal>
      </div>
      <div className={`flex flex-1 flex-col justify-center py-[clamp(1.25rem,4vh,3rem)] ${bleed ? '' : 'container-page'}`}>{children}</div>
    </div>
  )
}

export default SlideFrame
