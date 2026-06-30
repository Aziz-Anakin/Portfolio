import SectionHeading from '../components/SectionHeading.jsx'
import useShare from '../hooks/useShare'
import mark from '../assets/marks/one-piece-6.svg'

const contacts = [
  {
    label: 'Email',
    value: 'Yanis.mdoughy@outlook.fr',
    hint: 'Cliquer pour écrire',
    href: 'mailto:Yanis.mdoughy@outlook.fr',
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
  {
    label: 'Téléphone',
    value: '06 62 67 91 22',
    hint: 'Cliquer pour appeler',
    href: 'tel:+33662679122',
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Voir le profil',
    hint: 'Nouvel onglet',
    href: 'https://linkedin.com/in/yanis-mdoughy-558a1028b/',
    external: true,
    icon: (
      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.369-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.86V9h2.954v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: 'GitHub',
    value: 'Voir les projets',
    hint: 'Nouvel onglet',
    href: 'https://github.com/Aziz-Anakin',
    external: true,
    icon: (
      <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    ),
  },
]

function Contact() {
  const { copied, share } = useShare()

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white dark:bg-slate-950 reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Contact" mark={mark} />

        <ul className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:justify-center sm:items-start sm:gap-x-16 sm:gap-y-10">
          {contacts.map(({ label, value, href, external, icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex items-center gap-3 text-left sm:flex-col sm:gap-2 sm:text-center"
              >
                <span className="shrink-0 text-slate-900 dark:text-white p-2 rounded-xl
                               transition-all duration-300
                               group-hover:-translate-y-1 group-hover:scale-110
                               group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50
                               group-hover:text-blue-600 dark:group-hover:text-blue-400
                               group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                  <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {icon}
                  </svg>
                </span>
                <span className="flex flex-col items-start sm:items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {label}
                  </span>
                  <span className="font-code text-sm font-semibold text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={share}
            aria-label="Partager le portfolio"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3 font-code text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30"
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            )}
            {copied ? 'Lien copié !' : 'Partager le portfolio'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
