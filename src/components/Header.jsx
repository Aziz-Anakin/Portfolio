import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { NAV, NAV_GROUP, PROFILE } from '../data/profile'
import useShare from '../hooks/useShare'
import useModal from '../hooks/useModal'
import { useDeck } from './Deck.jsx'
import { CheckIcon, CloseIcon, MenuIcon, QrIcon, ShareIcon } from './Icons.jsx'
import logo from '../assets/images/logo.png'

const iconButton = 'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 ease-out hover:-translate-y-0.5'

function ShareButton() {
  const { copied, share } = useShare()
  return (
    <button type="button" onClick={share} aria-label="Partager le portfolio" title={copied ? 'Lien copié' : 'Partager le portfolio'} className={iconButton}>
      {copied ? <CheckIcon /> : <ShareIcon />}
    </button>
  )
}

// Menu plein écran des petits écrans : une grande ligne par section.
function MobileMenu({ active, onClose, onOpenCv }) {
  useModal(onClose)

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-[var(--bg)]"
    >
      <div className="container-page flex h-[var(--header-h)] shrink-0 items-center justify-end">
        <button type="button" onClick={onClose} aria-label="Fermer le menu" className={iconButton}>
          <CloseIcon />
        </button>
      </div>

      <nav aria-label="Sections" className="container-page flex flex-1 flex-col justify-center gap-1 pb-10">
        {NAV.map((n, i) => (
          <motion.a
            key={n.id}
            href={`#${n.id}`}
            onClick={onClose}
            aria-current={active === n.id ? 'true' : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="t-title flex items-center gap-4 py-1"
          >
            {/* La section en cours est marquée d'un trait, pas d'une couleur. */}
            <span aria-hidden="true" className={`h-1 bg-white transition-all duration-300 ${active === n.id ? 'w-8' : 'w-0'}`} />
            {n.label}
          </motion.a>
        ))}
      </nav>

      <div className="container-page flex flex-wrap gap-x-7 gap-y-1 pb-8">
        <button type="button" onClick={() => { onClose(); onOpenCv() }} className="link">CV</button>
        <a href={PROFILE.github.href} target="_blank" rel="noreferrer" className="link">GitHub</a>
        <a href={PROFILE.linkedin.href} target="_blank" rel="noreferrer" className="link">LinkedIn</a>
        <a href={`mailto:${PROFILE.email}`} className="link">Email</a>
      </div>
    </motion.div>,
    document.body,
  )
}

function Header({ onOpenCv }) {
  const { current, mobile } = useDeck()
  const active = NAV_GROUP[current.id] ?? current.id
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`z-50 shrink-0 ${mobile ? 'sticky top-0 bg-[var(--bg)]' : 'relative'}`}>
      <div className="container-page relative flex h-[var(--header-h)] items-center justify-between gap-4">
        <a href="#home" className="flex shrink-0 items-center gap-3" aria-label={`${PROFILE.name}, retour à l’accueil`}>
          <img src={logo} alt="" width="40" height="40" className="h-10 w-10 rounded-full object-cover" />
          <span className="t-small hidden font-semibold sm:block lg:hidden xl:block">{PROFILE.name}</span>
        </a>

        {/* Menu : l'indicateur blanc glisse vers la slide en cours */}
        <nav aria-label="Sections" className="hidden items-center lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? 'true' : undefined}
              className={`relative rounded-full px-3 py-2 text-[0.8125rem] font-semibold xl:px-4 xl:text-sm transition-colors duration-300 ${active === n.id ? 'text-[var(--bg)]' : 'text-white'}`}
            >
              {active === n.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
              )}
              <span className="relative">{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={onOpenCv} className="link mr-2 hidden sm:inline-flex">
            CV
          </button>
          <a href={`${import.meta.env.BASE_URL}qr/`} aria-label="QR code du portfolio" title="QR code du portfolio" className={iconButton}>
            <QrIcon />
          </a>
          <ShareButton />
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Ouvrir le menu" aria-expanded={menuOpen} className={`${iconButton} lg:hidden`}>
            <MenuIcon />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu active={active} onClose={() => setMenuOpen(false)} onOpenCv={onOpenCv} />}
      </AnimatePresence>
    </header>
  )
}

export default Header
