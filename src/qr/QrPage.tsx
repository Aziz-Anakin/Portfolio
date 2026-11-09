import '../styles/site.css'
import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Share2 } from 'lucide-react'
import QRCode from 'qrcode'
import { useReducedMotion } from 'motion/react'
import ShapeGrid from '../components/ShapeGrid.tsx'
import SectionTitle from '../components/SectionTitle.tsx'
import TextType from '../components/TextType.tsx'
import { Button } from '../components/ui/button.tsx'
import useShare from '../hooks/useShare.ts'
import useMediaQuery from '../hooks/useMediaQuery.ts'

// Adresse publique du portfolio (GitHub Pages) encodée dans le QR code.
const PORTFOLIO_URL = 'https://aziz-anakin.github.io/Portfolio/'

// Citations qui défilent en boucle (machine à écrire) sous le titre.
const QUOTES = [
  'Scanne-moi, je mords pas (souvent).',
  '99 problèmes mais un bon portfolio en résout un.',
  'console.log("scanne-moi")',
  'Un scan pour les impressionner tous.',
  'Ctrl+Z ne marche pas dans la vraie vie, scanne au lieu de réfléchir.',
]

// QR rendu en PNG net (pixels francs), encre sombre sur fond blanc pour qu'il se lise partout.
const qrPng = () =>
  QRCode.toDataURL(PORTFOLIO_URL, { errorCorrectionLevel: 'M', margin: 1, width: 1024, color: { dark: '#14111f', light: '#ffffff' } })

// Page du QR code, au design du site : bannière en dégradé avec la grille, titre « niveau », Pokémon, boutons plats.
function QrPage() {
  const reduce = useReducedMotion()
  const phone = useMediaQuery('(max-width: 639px)')
  const [qr, setQr] = useState('')
  const { copied, share } = useShare({ url: PORTFOLIO_URL, text: 'Découvre le portfolio de Yanis Mdoughy' })

  useEffect(() => {
    qrPng().then(setQr)
  }, [])

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-brand-gradient">
      <div className="absolute inset-0" aria-hidden="true">
        <ShapeGrid shape="square" cellSize={phone ? 32 : 56} direction="none" speed={0} lineColor="rgba(255,255,255,0.16)" hoverColor="#ffffff" fillOpacity={0.22} glow={0.2} intro={!reduce} />
      </div>

      <header className="relative z-10 border-b border-white/30 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <Button asChild size="sm" variant="outline">
            <a href={import.meta.env.BASE_URL}><ArrowLeft size={14} aria-hidden="true" />Portfolio</a>
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={share} aria-live="polite">
            {copied ? <Check size={14} aria-hidden="true" /> : <Share2 size={14} aria-hidden="true" />}
            {copied ? 'Lien copié' : 'Partager'}
          </Button>
        </div>
      </header>

      <main className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center gap-12 px-5 py-14 md:flex-row md:items-center md:justify-between md:gap-10 md:py-20">
        <div className="min-w-0 md:max-w-lg">
          <SectionTitle kicker="Niveau bonus" onGradient>QR code</SectionTitle>
          <div>
            <p className="min-h-[3lh] max-w-md font-mono text-sm uppercase tracking-wider md:text-base">
              <TextType as="span" text={QUOTES} typingSpeed={45} deletingSpeed={20} pauseDuration={1800} cursorCharacter="|" />
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <Button asChild variant="light">
                <a href={PORTFOLIO_URL}>Ouvrir le portfolio</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto mx-auto md:mx-0">
          <a href={PORTFOLIO_URL} aria-label="Ouvrir le portfolio de Yanis Mdoughy" className="relative block h-[min(78vw,22rem)] w-[min(78vw,22rem)] select-none">
            <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 bg-ink sm:translate-x-4 sm:translate-y-4" />
            <span className="relative block h-full w-full border-2 border-ink bg-white p-3 sm:p-4">
              {qr ? <img src={qr} alt="QR code du portfolio de Yanis Mdoughy" draggable={false} className="block h-full w-full [image-rendering:pixelated]" /> : null}
            </span>
          </a>
        </div>
      </main>
    </div>
  )
}

export default QrPage
