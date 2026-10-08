import { PARCOURS } from '../data/parcours'
import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import TiltedCard from '../components/TiltedCard.jsx'
import useMediaQuery from '../hooks/useMediaQuery.js'

// Du plus ancien au plus récent.
const FORMATIONS = PARCOURS.filter((step) => step.kind === 'Formation').reverse()

// Une formation : une grande pastille blanche avec le logo de l'école, puis le diplôme et l'année.
// Sur ordinateur la pastille pivote avec le curseur (React Bits « Tilted Card »).
function FormationItem({ formation, small }) {
  const { logo, logoOnLight, place, title, years, current } = formation

  return (
    <div className={small ? 'flex items-center gap-5' : 'flex flex-col items-center gap-6 text-center'}>
      <TiltedCard size={small ? 96 : 240} rotateAmplitude={small ? 0 : 12} scaleOnHover={1.04} idleSway={!small} className="shrink-0">
        <div className="flex h-full w-full items-center justify-center rounded-3xl bg-white p-[12%]">
          <img
            src={logo}
            alt={place}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`max-h-full max-w-full object-contain ${logoOnLight ? '' : 'brightness-0'}`}
          />
        </div>
      </TiltedCard>
      <div>
        <h3 className="t-heading max-w-[18rem]">{title}</h3>
        <p className="t-label mt-2">
          {years}
          {current && ' (en cours)'}
        </p>
      </div>
    </div>
  )
}

function Formation() {
  const narrow = useMediaQuery('(max-width: 767px)')

  return (
    <SlideFrame title="Formation">
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {FORMATIONS.map((f, i) => (
          <Reveal key={f.years} delay={0.1 + i * 0.1} className="md:flex md:justify-center">
            <FormationItem formation={f} small={narrow} />
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}

export default Formation
