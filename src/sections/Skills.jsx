import { ArrowUpRight } from 'lucide-react'
import { AI_SKILLS, SKILL_GROUPS } from '../data/skills'
import Poke from '../components/game/Poke.jsx'
import Section from '../components/Section.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'
import Spawn from '../components/Spawn.jsx'

// Compétences en texte, sans logos : une étiquette et la liste des technologies, deux colonnes (comme sur yurri.fr).
// Peu de choses, mais que Yanis maîtrise (la liste est dans data/skills.js). En dessous : les skills IA qu'il utilise.
function Skills() {
  return (
    <Section id="skills">
      <SectionTitle kicker="Compétences" level={3}>Compétences</SectionTitle>
      <Spawn>
        <dl className="grid grid-cols-2 border-b border-line">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="border-t border-line py-5 pr-4 sm:py-7">
              <dt className="font-mono text-xs uppercase tracking-widest text-bright">{group.label}</dt>
              <dd className="mt-3 text-lg leading-snug sm:text-2xl">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Spawn>

      <Reveal className="mt-32 md:mt-44">
        <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bright">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-pink" />
          Skills IA pour le web
        </h3>
        <div className="relative mt-5">
        {/* Mewtwo se tient debout sur la rangée des cartes IA, à droite du titre, dans un losange. */}
        <Poke name="mewtwo" from="up" halo="diamond" tag className="bottom-full right-3 -mb-1 md:right-10" />
        <ul className="grid gap-4 md:grid-cols-3 [&>li]:relative">
          {AI_SKILLS.map((skill) => (
            <li key={skill.name}>
              <a
                href={skill.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col border border-line bg-panel p-5 transition-colors duration-200 hover:border-pink"
              >
                <span className="flex items-center justify-between gap-3 font-anton text-2xl uppercase leading-none tracking-wide">
                  {skill.name}
                  <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                  <span className="sr-only"> (nouvel onglet)</span>
                </span>
                <span className="mt-3 text-sm leading-relaxed">{skill.text}</span>
              </a>
            </li>
          ))}
        </ul>
        </div>
      </Reveal>
    </Section>
  )
}

export default Skills
