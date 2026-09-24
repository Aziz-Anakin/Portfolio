import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import photo from '../assets/images/photo.jpg'
import emailLogo from '../assets/icons/email-logo.svg'
import cvLogo from '../assets/icons/cv-logo.svg'
import linkedinLogo from '../assets/icons/linkedin-logo.svg'
import githubLogo from '../assets/icons/github-logo.svg'

const links = [
  { href: 'mailto:Yanis.mdoughy@outlook.fr', src: emailLogo, label: 'Email', text: 'Yanis.mdoughy@outlook.fr' },
  { href: 'https://linkedin.com/in/yanis-mdoughy-558a1028b/', src: linkedinLogo, label: 'LinkedIn', text: 'yanis-mdoughy', external: true },
  { href: 'https://github.com/Aziz-Anakin', src: githubLogo, label: 'GitHub', text: 'Aziz-Anakin', external: true },
]

const springValues = { damping: 22, stiffness: 220, mass: 1 }
const TILT = 14

function PhoneIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function CardFace({ onOpenCv }) {
  return (
    <div className="relative aspect-[85.6/54] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blue-400 to-indigo-600" />

      <div className="flex h-full flex-col p-4 pl-6 sm:p-6 sm:pl-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-anton text-lg uppercase leading-none tracking-wide text-white sm:text-2xl">
              Mdoughy Yanis
            </p>
            <p className="mt-1.5 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300 sm:text-[11px]">
              Développeur Web · Full-Stack
            </p>
          </div>
          <img
            src={photo}
            alt="Yanis Mdoughy"
            draggable={false}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/10 sm:h-14 sm:w-14"
          />
        </div>

        <div className="my-auto flex items-center gap-2 py-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
          <p className="text-[10px] font-medium text-white/60 sm:text-xs">Paris 18e · Epitech Paris</p>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-white/10 pt-2.5 sm:gap-3 sm:pt-3">
          <a href="tel:+33662679122" aria-label="Téléphone" title="06 62 67 91 22" className="flex h-7 w-7 items-center justify-center rounded-md text-white transition-colors hover:text-blue-300 sm:h-8 sm:w-8">
            <PhoneIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          {links.map(({ href, src, label, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-opacity hover:opacity-70 sm:h-8 sm:w-8"
            >
              <img src={src} alt="" aria-hidden="true" draggable={false} className="h-3.5 w-3.5 invert sm:h-4 sm:w-4" />
            </a>
          ))}

          <button
            type="button"
            onClick={onOpenCv}
            className="flex items-center gap-1 rounded-md px-1.5 text-[10px] font-semibold text-blue-300 transition-colors hover:text-blue-200 sm:text-xs"
          >
            <img src={cvLogo} alt="" aria-hidden="true" draggable={false} className="h-3 w-3 invert sm:h-3.5 sm:w-3.5" />
            CV
          </button>
        </div>
      </div>
    </div>
  )
}

// Carte de visite qu'on attrape et fait pivoter en 3D, comme le Lanyard
// d'origine — mais sans moteur physique: transforms CSS pilotés par
// framer-motion (drag + tilt souris), bien plus léger.
export default function BusinessCard({ onOpenCv }) {
  const ref = useRef(null)
  const draggingRef = useRef(false)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const handlePointerMove = (e) => {
    if (draggingRef.current || e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    rotateX.set((offsetY / (rect.height / 2)) * -TILT * 0.6)
    rotateY.set((offsetX / (rect.width / 2)) * TILT)
  }

  const handleDrag = (_, info) => {
    rotateY.set(Math.max(-TILT, Math.min(TILT, info.offset.x / 6)))
    rotateX.set(Math.max(-TILT * 0.6, Math.min(TILT * 0.6, -info.offset.y / 8)))
  }

  return (
    <div className="mx-auto w-full max-w-sm [perspective:1200px]">
      <motion.div
        ref={ref}
        drag
        dragElastic={0.5}
        dragSnapToOrigin
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => { if (!draggingRef.current) resetTilt() }}
        onDragStart={() => { draggingRef.current = true }}
        onDrag={handleDrag}
        onDragEnd={() => { draggingRef.current = false; resetTilt() }}
        style={{ rotateX, rotateY }}
        className="touch-none select-none [transform-style:preserve-3d] will-change-transform cursor-grab active:cursor-grabbing"
      >
        <CardFace onOpenCv={onOpenCv} />
      </motion.div>
    </div>
  )
}
