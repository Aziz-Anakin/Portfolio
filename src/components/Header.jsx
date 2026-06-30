import { useEffect, useState } from 'react'
import useShare from '../hooks/useShare'
import logo from '../assets/images/logo.png'
import cvPdf from '../assets/documents/cv-yanis-mdoughy.pdf'
import emailLogo from '../assets/icons/email-logo.svg'
import cvLogo from '../assets/icons/cv-logo.svg'
import linkedinLogo from '../assets/icons/linkedin-logo.svg'
import githubLogo from '../assets/icons/github-logo.svg'

const links = [
  { href: 'mailto:Yanis.mdoughy@outlook.fr', src: emailLogo, label: 'Email' },
  { href: cvPdf, src: cvLogo, label: 'CV', external: true },
  { href: 'https://linkedin.com/in/yanis-mdoughy-558a1028b/', src: linkedinLogo, label: 'LinkedIn', external: true },
  { href: 'https://github.com/Aziz-Anakin', src: githubLogo, label: 'GitHub', external: true },
]

const navItems = [
  { href: '#about',      label: 'À propos' },
  { href: '#projects',   label: 'Projets' },
  { href: '#skills',     label: 'Compétences' },
  { href: '#setup',      label: 'Setup' },
  { href: '#experience', label: 'Expérience' },
  { href: '#formation',  label: 'Formation' },
  { href: '#interests',  label: 'Loisirs' },
  { href: '#contact',    label: 'Contact' },
]

function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/15 dark:hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-150"
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function ShareButton() {
  const { copied, share } = useShare()

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Partager le portfolio"
      title={copied ? 'Lien copié !' : 'Partager le portfolio'}
      className="relative flex items-center gap-1.5 h-8 px-2.5 rounded-md text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/15 dark:hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-150"
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
      <span className="hidden sm:inline">{copied ? 'Lien copié !' : 'Partager'}</span>
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  // Fermer le menu mobile avec Échap.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-content mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-6">

        {/* Logo One Piece */}
        <a href="#home" aria-label="Accueil" className="flex-shrink-0">
          <img
            src={logo}
            alt="Accueil"
            className="h-10 w-10 rounded-full object-cover object-center ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm"
          />
        </a>

        {/* Nav links — masqués sous lg (→ menu burger) */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigation">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-2 py-1.5 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/15 dark:hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Social / CV icons + theme toggle + burger */}
        <div className="flex items-center gap-2">
          {links.map(({ href, src, label, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800 hover:shadow-md hover:shadow-slate-900/15 dark:hover:shadow-white/15 hover:-translate-y-0.5 transition-all duration-150"
            >
              <img src={src} alt={label} className="w-4 h-4 dark:invert" />
            </a>
          ))}
          <span className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
          <ShareButton />
          <ThemeToggle />

          {/* Bouton burger — visible uniquement sous lg */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-all duration-150"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile / tablette */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navigation mobile"
          className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 animate-fade-in"
        >
          <ul className="max-w-content mx-auto px-5 sm:px-8 py-1 divide-y divide-slate-100 dark:divide-slate-800">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 py-3.5 pl-1 text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:pl-3 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150"
                >
                  <span>{label}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
