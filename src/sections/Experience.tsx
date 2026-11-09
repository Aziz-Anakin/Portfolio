import { ArrowUpRight } from 'lucide-react'
import { PARCOURS } from '../data/parcours'
import Section from '../components/Section.tsx'
import SectionTitle from '../components/SectionTitle.tsx'
import TechBadges from '../components/TechBadges.tsx'
import { Card, CardLabel, CardTitle } from '../components/ui/card.tsx'

const EXPERIENCES = PARCOURS.filter((step) => step.kind === 'Expérience')

function Experience() {
  return (
    <Section id="experience">
      <SectionTitle kicker="Expérience" level={5}>Expérience</SectionTitle>
      <div className="space-y-4">
        {EXPERIENCES.map((exp) => (
          <div key={exp.place}>
            <Card className="grid gap-6 p-6 hover:border-bright md:grid-cols-[14rem_1fr] md:p-8">
              <div>
                <CardLabel>{exp.years}</CardLabel>
                {exp.meta && <p className="mt-2 font-mono text-xs uppercase tracking-wider">{exp.meta}</p>}
                <img
                  src={exp.logo}
                  alt={exp.place}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={`mt-6 ${exp.logoWide ? 'h-9 w-auto max-w-full object-contain object-left' : 'h-14 w-14'}`}
                />
              </div>
              <div>
                <CardTitle>{exp.title}</CardTitle>
                <a href={exp.href} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-bright hover:underline">
                  {exp.place} <ArrowUpRight size={14} />
                </a>
                <ul className="mt-5 space-y-2 leading-relaxed">
                  {exp.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="text-bright">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
                {exp.stack && <TechBadges names={exp.stack} className="mt-5" />}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Experience
