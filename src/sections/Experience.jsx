import SectionHeading from '../components/SectionHeading.jsx'
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

function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Expérience" mark={mark} />

        <ol className="max-w-3xl space-y-10">
          {experiences.map((exp) => (
            <li key={exp.role} className="reveal" data-reveal>

              {/* ── Header : logo + infos ── */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {exp.logo ? (
                  <a
                    href={exp.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={exp.company}
                    className="shrink-0"
                  >
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className={`h-10 w-auto max-w-[120px] sm:max-w-[140px] object-contain ${exp.darkLogo ? 'invert dark:invert-0' : ''}`}
                    />
                  </a>
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-base font-bold text-white"
                  >
                    {exp.company.charAt(0)}
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  {exp.href ? (
                    <a
                      href={exp.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {exp.company}
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {exp.company}
                    </span>
                  )}
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-0.5">
                    <h3 className="font-code text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {exp.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Description ── */}
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {exp.description}
              </p>

              {/* ── Skills & Competencies Badges with Logos ── */}
              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {exp.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {skill.logo && (
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className={`w-4 h-4 object-contain shrink-0 ${skill.invert ? 'dark:invert' : ''}`}
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
