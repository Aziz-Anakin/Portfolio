import { PROFILE } from '../data/profile'
import Section from '../components/Section.tsx'
import SectionTitle from '../components/SectionTitle.tsx'
import { Card, CardLabel } from '../components/ui/card.tsx'

// Trois repères lisibles en quelques secondes, à la place d'un paragraphe.
const FACTS = [
  { label: 'Formation', value: 'Bachelor Informatique', detail: '2ᵉ année · Epitech Paris' },
  { label: 'Spécialité', value: 'Web, cloud, blockchain', detail: 'Après une 1ʳᵉ année couvrant web, cybersécurité, DevOps, IA et data' },
  { label: 'Je cherche', value: 'Stage puis alternance', detail: PROFILE.availability },
]

function Profile() {
  return (
    <Section id="about">
      <SectionTitle kicker="Profil" level={1}>Profil</SectionTitle>
      <p className="max-w-3xl text-xl leading-relaxed md:text-2xl">
        {PROFILE.role}. Je construis des applications complètes, du besoin de départ jusqu’à la mise en ligne.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {FACTS.map((fact) => (
          <div key={fact.label} className="h-full">
            <Card className="h-full p-6 hover:border-bright">
              <CardLabel>{fact.label}</CardLabel>
              <p className="mt-5 font-anton text-3xl uppercase leading-tight tracking-wide">{fact.value}</p>
              <p className="mt-3 text-sm leading-relaxed">{fact.detail}</p>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Profile
