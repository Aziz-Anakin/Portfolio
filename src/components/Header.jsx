import { Mail } from 'lucide-react'
import { PROFILE } from '../data/profile'
import { Button } from './ui/button.jsx'
import { GitHubIcon, LinkedInIcon } from './Icons.jsx'
import cvPdf from '../assets/documents/CV_Yanis_Mdoughy.pdf'
import logo from '../assets/images/logo.png'

// Photo de profil GitHub : la changer sur GitHub la change ici. Le logo local sert si GitHub ne répond pas.
const AVATAR = `https://github.com/${PROFILE.github.label}.png?size=96`

const CONTACTS = [
  { label: 'LinkedIn', href: PROFILE.linkedin.href, Icon: LinkedInIcon, external: true },
  { label: 'GitHub', href: PROFILE.github.href, Icon: GitHubIcon, external: true },
  { label: 'Email', href: `mailto:${PROFILE.email}`, Icon: Mail },
]

// Barre du haut, collée en haut de l'écran : photo de profil à gauche (retour à l'accueil), à droite le CV et
// les moyens de contact en boutons carrés. Pas de menu : la page se parcourt en défilant.
function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#home" aria-label={`${PROFILE.name}, retour à l’accueil`} className="shrink-0">
          <img
            src={AVATAR}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = logo
            }}
            alt=""
            width="40"
            height="40"
            className="h-10 w-10 border border-line object-cover transition-colors hover:border-bright"
          />
        </a>

        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <a href={cvPdf} target="_blank" rel="noreferrer" download="CV_Yanis_Mdoughy.pdf" aria-label="Télécharger le CV (PDF)">CV</a>
          </Button>
          {CONTACTS.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="flex h-9 w-9 items-center justify-center border border-white/40 text-white transition-colors hover:border-azure hover:bg-azure"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
