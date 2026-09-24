import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import SectionHeading from '../components/SectionHeading.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import mark from '../assets/marks/one-piece-4.svg'
import interfaceLogo from '../assets/images/interface-formation.png'

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
      { name: 'WordPress', logo: `${DEV}/wordpress/wordpress-plain.svg` },
    ],
  },
]

const pad = (n) => String(n).padStart(2, '0')

// Frise chronologique : la ligne se remplit au fil du défilement,
// chaque étape s'allume quand la ligne l'atteint.
function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="py-20 sm:py-24 bg-transparent reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Expérience" mark={mark} />

        <ol ref={listRef} className="relative max-w-4xl space-y-8 pl-12 sm:pl-16">
          {/* Rail + remplissage lié au défilement */}
          <span aria-hidden="true" className="absolute bottom-3 left-[15px] top-3 w-0.5 rounded-full bg-white/10 sm:left-[23px]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-3 left-[15px] top-3 w-0.5 origin-top rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] sm:left-[23px]"
          />

          {experiences.map((exp, i) => (
            <li key={exp.role} className="relative reveal" data-reveal>
              {/* Étape */}
              <span
                aria-hidden="true"
                className="absolute -left-12 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/50 bg-slate-950 font-code text-[10px] font-bold text-blue-300 shadow-[0_0_18px_rgba(59,130,246,0.45)] sm:-left-16 sm:h-12 sm:w-12 sm:text-xs"
              >
                {pad(i + 1)}
              </span>

              <SpotlightCard spotlightColor="rgba(96, 165, 250, 0.16)" className="group p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <a
                      href={exp.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={exp.company}
                      className="flex h-14 w-24 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:border-blue-400/50 sm:w-32"
                    >
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

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-code text-xs font-bold text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {exp.duration}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-white">{exp.description}</p>

                {exp.skills?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/60"
                      >
                        <img
                          src={skill.logo}
                          alt=""
                          aria-hidden="true"
                          className={`h-4 w-4 shrink-0 object-contain ${skill.invert ? 'invert' : ''}`}
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
