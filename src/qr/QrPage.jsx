import '../styles/index.css'
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import ClickSpark from '../components/ClickSpark.jsx'
import Squares from '../components/Squares.jsx'
import TiltedCard from '../components/TiltedCard.jsx'
import TextType from '../components/TextType.jsx'
import useShare from '../hooks/useShare.js'

// Adresse publique du portfolio (GitHub Pages) encodée dans le QR code.
const PORTFOLIO_URL = 'https://aziz-anakin.github.io/Portfolio/'

// Citations qui défilent en boucle (machine à écrire) sous le QR code.
const QUOTES = [
  'Scanne-moi, je mords pas (souvent).',
  '99 problèmes mais un bon portfolio en résout un.',
  'console.log("scanne-moi")',
  'Un scan pour les impressionner tous.',
  'Ctrl+Z ne marche pas dans la vraie vie, scanne au lieu de réfléchir.',
]

// QR rendu en PNG (et non en SVG) : Safari le rastérise une seule fois au lieu
// de le redessiner à chaque image pendant la rotation 3D.
const qrPng = (dark) =>
  QRCode.toDataURL(PORTFOLIO_URL, {
    errorCorrectionLevel: 'M',
    margin: 0,
    width: 1024,
    color: { dark, light: '#0000' },
  })

// Couche de la carte, décalée en profondeur pour l'effet de relief.
// backface-visibility évite le scintillement des couches 3D sur iOS.
const Layer = ({ z, className = '', children }) => (
  <div
    className={`absolute ${className}`}
    style={{ transform: `translateZ(${z}px)`, WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
  >
    {children}
  </div>
)

const QrImage = ({ src }) => (
  <img src={src} alt="" draggable={false} decoding="async" className="block h-full w-full [image-rendering:pixelated]" />
)

function QrPage() {
  const [front, setFront] = useState('')
  const [depth, setDepth] = useState('')
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [size, setSize] = useState(() => Math.min(340, window.innerWidth - 48))
  const { copied, share } = useShare({
    url: PORTFOLIO_URL,
    text: 'Découvre le portfolio de Yanis Mdoughy',
  })

  useEffect(() => {
    qrPng('#0f172a').then(setFront)
    qrPng('#6366f1').then(setDepth)
    const onResize = () => setSize(Math.min(340, window.innerWidth - 48))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Même bascule que sur le portfolio : classe `dark` sur <html> + préférence en mémoire.
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
    <ClickSpark sparkColor="#6366f1" sparkCount={10} sparkRadius={24}>
      <div className="relative min-h-[100dvh] overflow-hidden bg-white text-slate-900 font-mono dark:bg-slate-950 dark:text-slate-100">
        {/* Fond animé React Bits « Squares » */}
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.35}
            squareSize={44}
            borderColor={dark ? 'rgba(129, 140, 248, 0.16)' : 'rgba(99, 102, 241, 0.16)'}
            hoverFillColor={dark ? 'rgba(96, 165, 250, 0.18)' : 'rgba(37, 99, 235, 0.14)'}
          />
        </div>

        {/* Bascule clair / sombre, discrète en haut à gauche */}
        <button
          type="button"
          onClick={() => setDark((d) => !d)}
          aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
          title={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
          className="fixed top-4 left-4 sm:top-6 sm:left-6 z-20 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-500 dark:hover:text-blue-400 dark:hover:bg-slate-800/60 active:scale-90 transition-all duration-150 [-webkit-tap-highlight-color:transparent]"
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

        {/* Partage natif (iPhone / Android / PC), discret en haut à droite */}
        <button
          type="button"
          onClick={share}
          aria-label={copied ? 'Lien copié !' : 'Partager le portfolio'}
          title={copied ? 'Lien copié !' : 'Partager le portfolio'}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-500 dark:hover:text-blue-400 dark:hover:bg-slate-800/60 active:scale-90 transition-all duration-150 [-webkit-tap-highlight-color:transparent]"
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          )}
        </button>

        <main className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center gap-12 px-4 py-12">
          {/* Apparition en CSS (opacité + translation) : gérée par le GPU. */}
          <h1 className="animate-fade-up opacity-0 text-center font-anton text-5xl sm:text-7xl uppercase tracking-wide leading-none text-blue-600 dark:text-blue-400">
            Mdoughy Yanis
          </h1>

          {/* QR code 3D : React Bits « Tilted Card » + couches en profondeur */}
          <a
            href={PORTFOLIO_URL}
            aria-label="Ouvrir le portfolio de Yanis Mdoughy"
            className="[-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] select-none"
          >
            <TiltedCard size={size} rotateAmplitude={18}>
              {/* Ombre portée au sol (dégradé plutôt que filtre blur : bien plus léger sur iOS) */}
              <Layer z={-40} className="-inset-6 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.45),transparent)]" />
              {/* Plaque arrière (épaisseur) */}
              <Layer z={0} className="inset-0 rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500" />
              {/* Plaque avant blanche */}
              <Layer z={24} className="inset-0 rounded-[2rem] bg-white shadow-2xl shadow-slate-900/30 ring-1 ring-slate-200" />
              {/* Modules du QR : copie colorée en retrait = relief extrudé */}
              <Layer z={34} className="inset-[9%] opacity-60">
                {depth && <QrImage src={depth} />}
              </Layer>
              <Layer z={52} className="inset-[9%]">
                {front && <QrImage src={front} />}
              </Layer>
            </TiltedCard>
          </a>

          {/* Citations React Bits « Text Type » : tape puis efface, en boucle infinie */}
          <TextType
            as="p"
            text={QUOTES}
            typingSpeed={45}
            deletingSpeed={20}
            pauseDuration={1800}
            loop
            showCursor
            cursorCharacter="_"
            className="text-center text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400 px-6 min-h-[3em] sm:min-h-[2.5em]"
            cursorClassName="text-blue-600 dark:text-blue-400"
          />
        </main>
      </div>
    </ClickSpark>
  )
}

export default QrPage
