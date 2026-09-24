import { useMemo } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import LogoLoop from '../components/LogoLoop.jsx'
import mark from '../assets/marks/one-piece-4.svg'
import interfaceLogo from '../assets/images/interface-formation.png'
import canvaLogo from '../assets/icons/canva.png'

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const experiences = [
  {
    role: 'Stagiaire — Pôle informatique',
    duration: '1 mois',
    company: 'Star Invest',
    href: 'https://www.starinvest.fr/',
    logo: 'https://www.starinvest.fr/wp-content/uploads/2019/12/LOGO-SITE-blanc-2.png',
    darkLogo: true,
    description:
      "Stage de première année à Epitech, intégré au pôle informatique. Participation au développement web, aux missions techniques de l'équipe, à la migration de base de données et à la gestion des outils d'information.",
    skills: [
      { name: 'Vue.js', logo: `${DEV}/vuejs/vuejs-original.svg` },
      { name: 'Nuxt', logo: `${DEV}/nuxtjs/nuxtjs-original.svg` },
      { name: 'Next.js', logo: `${DEV}/nextjs/nextjs-original.svg`, invert: true },
      { name: 'NestJS', logo: `${DEV}/nestjs/nestjs-original.svg` },
      { name: 'React', logo: `${DEV}/react/react-original.svg` },
      { name: 'SQL Server', logo: `${DEV}/microsoftsqlserver/microsoftsqlserver-original.svg` },
    ],
  },
  {
    role: 'Helpdesk — Maintenance informatique',
    duration: '2 mois',
    company: 'Association Interface Formation',
    href: 'https://www.interface-formation.net/',
    logo: interfaceLogo,
    description:
      "Maintenance informatique assurée sur le siège social ainsi que sur les différents sites de l'entreprise. Gestion et maintenance du parc informatique (postes utilisateurs, mise à jour de pilotes, périphériques), création de guides d'utilisation sur Canva, assistance technique auprès des utilisateurs et maintenance du site WordPress.",
    skills: [
      { name: 'Windows', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Windows_logo_-_2021.svg/250px-Windows_logo_-_2021.svg.png' },
      { name: 'Linux', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/250px-Tux.svg.png' },
      { name: 'Word', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Microsoft_Office_Word_%282019%E2%80%932025%29.svg/250px-Microsoft_Office_Word_%282019%E2%80%932025%29.svg.png' },
      { name: 'Excel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Microsoft_Office_Excel_%282019%E2%80%932025%29.svg/250px-Microsoft_Office_Excel_%282019%E2%80%932025%29.svg.png' },
      { name: 'PowerPoint', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_Office_PowerPoint_%282019%E2%80%932025%29.svg/250px-Microsoft_Office_PowerPoint_%282019%E2%80%932025%29.svg.png' },
      { name: 'Canva', logo: canvaLogo },
      { name: 'WordPress', logo: `${DEV}/wordpress/wordpress-plain.svg` },
    ],
  },
]

function SkillItem({ skill }) {
  return (
    <span className="group flex flex-col items-center gap-2">
      <img
        src={skill.logo}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
        className={`h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 ${skill.invert ? 'invert' : ''}`}
      />
      <span className="text-xs font-medium whitespace-nowrap text-white/60">{skill.name}</span>
    </span>
  )
}

function ExperienceStack({ skills }) {
  const logos = useMemo(() => skills, [skills])

  return (
    <LogoLoop
      logos={logos}
      speed={36}
      direction="left"
      logoHeight={32}
      gap={40}
      pauseOnHover
      fadeOut
      ariaLabel="Stack technique"
      className="py-2"
      renderItem={(skill) => <SkillItem skill={skill} />}
    />
  )
}

function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 bg-transparent reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Expérience" mark={mark} />

        <div className="mx-auto flex max-w-3xl flex-col divide-y divide-white/10">
          {experiences.map((exp) => (
            <article key={exp.role} className="reveal py-10 first:pt-0 last:pb-0" data-reveal>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <a href={exp.href} target="_blank" rel="noreferrer" aria-label={exp.company} className="flex h-12 w-20 shrink-0 items-center justify-center sm:w-24">
                    <img src={exp.logo} alt={exp.company} className="max-h-full max-w-full object-contain" />
                  </a>
                  <div className="min-w-0">
                    <a
                      href={exp.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-blue-300 transition-colors hover:text-blue-200"
                    >
                      {exp.company}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                    <h3 className="mt-1 font-anton text-2xl uppercase leading-tight tracking-wide text-white sm:text-3xl">{exp.role}</h3>
                  </div>
                </div>

                <span className="font-code text-xs font-semibold text-white/50">{exp.duration}</span>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70">{exp.description}</p>

              {exp.skills?.length > 0 && (
                <div className="mt-5">
                  <ExperienceStack skills={exp.skills} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
