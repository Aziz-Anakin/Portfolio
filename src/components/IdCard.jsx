import { Suspense, lazy, useRef } from 'react'
import { useInView } from 'motion/react'

// React Bits « Lanyard » : carte d'identité 3D suspendue, qu'on attrape et qu'on retourne.
// Le module (three.js + moteur physique) n'est chargé qu'à l'approche de la section.
const LanyardCard = lazy(() => import('./Lanyard/LanyardCard.jsx'))

const HEIGHT = 'h-[78vh] min-h-[560px] max-h-[860px]'

export default function IdCard({ onOpenCv }) {
  const ref = useRef(null)
  const near = useInView(ref, { once: true, margin: '800px 0px' })
  const visible = useInView(ref)

  return (
    <div ref={ref} className="relative">
      {/* Liens accessibles (lecteurs d'écran, clavier) */}
      <ul className="sr-only">
        <li><a href="mailto:Yanis.mdoughy@outlook.fr">Email : Yanis.mdoughy@outlook.fr</a></li>
        <li><a href="tel:+33662679122">Téléphone : 06 62 67 91 22</a></li>
        <li><a href="https://linkedin.com/in/yanis-mdoughy-558a1028b/" target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a href="https://github.com/Aziz-Anakin" target="_blank" rel="noreferrer">GitHub</a></li>
        <li><button type="button" onClick={onOpenCv}>Consulter le CV</button></li>
      </ul>

      <div aria-hidden="true" className={`relative left-1/2 w-screen -translate-x-1/2 -mt-4 sm:-mt-24 ${HEIGHT}`}>
        {near && (
          <Suspense fallback={null}>
            <LanyardCard onOpenCv={onOpenCv} active={visible} className="h-full" />
          </Suspense>
        )}
      </div>
    </div>
  )
}
