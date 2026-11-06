import SlideFrame from '../components/SlideFrame.jsx'
import Reveal from '../components/Reveal.jsx'
import { PROFILE } from '../data/profile'

// Trois repères lisibles en quelques secondes, à la place d'un paragraphe.
const FACTS = [
  { label: 'Formation', value: 'Bachelor Informatique', detail: '2ᵉ année · Epitech Paris' },
  { label: 'Spécialité', value: 'Web, cloud et blockchain', detail: 'Après une 1ʳᵉ année couvrant web, cybersécurité, DevOps, IA et data' },
  { label: 'Je cherche', value: 'Stage puis alternance', detail: PROFILE.availability },
]

function Profile() {
  return (
    <SlideFrame title="Profil">
      <Reveal as="p" delay={0.08} className="t-heading">
        {PROFILE.role}
      </Reveal>
      <Reveal as="p" delay={0.14} className="t-lead mt-4 max-w-3xl">
        Je construis des applications complètes, du besoin de départ jusqu’à la mise en ligne.
      </Reveal>
      <dl className="mt-[clamp(1.5rem,6vh,3.5rem)] grid gap-x-10 gap-y-8 md:grid-cols-3">
        {FACTS.map((fact, i) => (
          <Reveal key={fact.label} delay={0.2 + i * 0.08} className="border-t border-white/40 pt-4">
            <dt className="t-data uppercase tracking-widest">{fact.label}</dt>
            <dd className="mt-3 font-anton text-[clamp(1.5rem,2.4vw,2.25rem)] uppercase leading-none tracking-[0.01em]">{fact.value}</dd>
            <dd className="t-small mt-3">{fact.detail}</dd>
          </Reveal>
        ))}
      </dl>
    </SlideFrame>
  )
}

export default Profile
