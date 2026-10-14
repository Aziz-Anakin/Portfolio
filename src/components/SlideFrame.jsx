import Reveal from './Reveal.jsx'
import DepthText from './DepthText.jsx'

// Cadre commun à toutes les slides : le titre toujours au même endroit (en haut à gauche),
// et le contenu centré dans la hauteur restante.
// `bleed` laisse le contenu aller d'un bord à l'autre de l'écran.
// `start` colle le contenu sous le titre au lieu de le centrer (texte court, sans visuel).
function SlideFrame({ title, bleed = false, start = false, children }) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="container-page flex items-end justify-between gap-6 pt-[clamp(0.25rem,2.5vh,1.75rem)]">
        {/* Titre en relief (React Bits « Depth Text ») : il tourne doucement tout seul */}
        <Reveal as="h2" y={16}>
          <DepthText
            text={title}
            layers={18}
            depth={1.6}
            tilt={6}
            faceColor="#ffffff"
            depthColor="var(--depth-title-back)"
            fontSize="clamp(2.25rem, min(6.4vw, 8.5vh), 4.5rem)"
            letterSpacing="0.01em"
            shadow={false}
            className="font-anton uppercase"
          />
        </Reveal>
      </div>
      <div className={`flex flex-1 flex-col py-[clamp(1.25rem,4vh,3rem)] ${start ? 'justify-start' : 'justify-center'} ${bleed ? '' : 'container-page lg:pr-[5.5rem] 2xl:pr-0'}`}>{children}</div>
    </div>
  )
}

export default SlideFrame
