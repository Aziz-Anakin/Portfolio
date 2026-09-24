import useShare from '../hooks/useShare'
import SectionIndicator from './SectionIndicator.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import logo from '../assets/images/logo.png'
import emailLogo from '../assets/icons/email-logo.svg'
import cvLogo from '../assets/icons/cv-logo.svg'
import cvPdf from '../assets/documents/CV_Yanis_Mdoughy.pdf'
import linkedinLogo from '../assets/icons/linkedin-logo.svg'
import githubLogo from '../assets/icons/github-logo.svg'

const links = [
  { href: 'mailto:Yanis.mdoughy@outlook.fr', src: emailLogo, label: 'Email' },
  { href: cvPdf, src: cvLogo, label: 'CV', external: true },
  { href: 'https://linkedin.com/in/yanis-mdoughy-558a1028b/', src: linkedinLogo, label: 'LinkedIn', external: true },
  { href: 'https://github.com/Aziz-Anakin', src: githubLogo, label: 'GitHub', external: true },
]

function ShareButton() {
  const { copied, share } = useShare()

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Partager le portfolio"
      title={copied ? 'Lien copié !' : 'Partager le portfolio'}
      className="relative flex items-center justify-center gap-1.5 h-8 sm:h-10 lg:h-8 w-8 sm:w-auto sm:min-w-10 lg:min-w-0 px-0 sm:px-2.5 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-white dark:hover:text-blue-400 dark:hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/15 dark:hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-150"
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      )}
      <span className="hidden xl:inline">{copied ? 'Lien copié !' : 'Partager'}</span>
    </button>
  )
}

function Header({ onOpenCv }) {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="relative mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-2.5 shadow-lg shadow-black/30 backdrop-blur-xl sm:px-3 md:grid md:h-16 md:grid-cols-[1fr_auto_1fr] md:px-4">

        {/* Logo One Piece */}
        <a href="#home" aria-label="Accueil" className="flex-shrink-0 md:justify-self-start">
          <img
            src={logo}
            alt="Accueil"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover object-center ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm transition-transform duration-500 hover:rotate-[360deg]"
          />
        </a>

        {/* Section en cours (PC) */}
        <SectionIndicator className="hidden md:flex" />

        {/* Raccourcis */}
        <div className="flex flex-1 items-center justify-between gap-0.5 sm:flex-none sm:justify-end sm:gap-2 md:justify-self-end">
          {/* `contents` sous sm : les raccourcis rejoignent la rangée parente
              pour être répartis avec les autres boutons, sans vide après l'avatar. */}
          <div className="contents sm:flex sm:items-center sm:gap-2">
          {links.map(({ href, src, label, external }) => (
            label === 'CV' ? (
              <button
                key={label}
                type="button"
                onClick={onOpenCv}
                aria-label="Voir le CV"
                title="Consulter le CV"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8 flex items-center justify-center rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-white dark:hover:text-blue-400 dark:hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/15 dark:hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
              >
                <img src={src} alt={label} className="w-4 h-4 dark:invert" />
              </button>
            ) : (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8 flex items-center justify-center rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-white dark:hover:text-blue-400 dark:hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/15 dark:hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-150"
              >
                <img src={src} alt={label} className="w-4 h-4 dark:invert" />
              </a>
            )
          ))}
          </div>
          <span className="hidden sm:block mx-0.5 xl:mx-1 h-5 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
          <ShareButton />
        </div>
        <ScrollProgress className="absolute inset-x-4 bottom-0" />
      </div>
    </header>
  )
}

export default Header
