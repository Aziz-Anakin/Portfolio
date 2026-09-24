import useShare from '../hooks/useShare'
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

const iconButtonClass =
  'group flex h-9 w-9 items-center justify-center rounded-lg text-white [perspective:600px] transition-transform duration-300 ease-out hover:-translate-y-1 sm:h-10 sm:w-10'
const iconImgClass =
  'h-4 w-4 dark:invert transition-transform duration-300 ease-out group-hover:[transform:rotateX(20deg)_scale(1.15)] sm:h-5 sm:w-5'
const iconSvgClass =
  'h-4 w-4 transition-transform duration-300 ease-out group-hover:[transform:rotateX(20deg)_scale(1.15)] sm:h-5 sm:w-5'

function QrButton() {
  return (
    <a href={`${import.meta.env.BASE_URL}qr/`} aria-label="QR code du portfolio" title="QR code du portfolio" className={iconButtonClass}>
      <svg className={iconSvgClass} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
      </svg>
    </a>
  )
}

function ShareButton() {
  const { copied, share } = useShare()

  return (
    <button type="button" onClick={share} aria-label="Partager le portfolio" title={copied ? 'Lien copié !' : 'Partager le portfolio'} className={iconButtonClass}>
      {copied ? (
        <svg className={iconSvgClass} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg className={iconSvgClass} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      )}
    </button>
  )
}

function Header({ onOpenCv }) {
  return (
    <header className="sticky top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-6 -z-10 bg-gradient-to-b from-slate-950 via-slate-950/85 to-transparent"
      />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a href="#home" aria-label="Accueil" className="flex-shrink-0 [perspective:600px]">
          <img
            src={logo}
            alt="Accueil"
            className="h-9 w-9 rounded-full object-cover object-center shadow-[0_10px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:rotate-[360deg] sm:h-10 sm:w-10"
          />
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map(({ href, src, label, external }) =>
            label === 'CV' ? (
              <button key={label} type="button" onClick={onOpenCv} aria-label="Voir le CV" title="Consulter le CV" className={iconButtonClass}>
                <img src={src} alt={label} className={iconImgClass} />
              </button>
            ) : (
              <a key={label} href={href} aria-label={label} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className={iconButtonClass}>
                <img src={src} alt={label} className={iconImgClass} />
              </a>
            )
          )}
          <QrButton />
          <ShareButton />
        </div>
      </div>
    </header>
  )
}

export default Header
