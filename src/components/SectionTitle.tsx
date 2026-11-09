import type { ReactNode } from 'react'

// Titre de section : repère mono (niveau du jeu) au-dessus d'un titre Anton à plat.
type SectionTitleProps = { kicker: string; level?: number; children: ReactNode; onGradient?: boolean }

function SectionTitle({ kicker, level, children, onGradient = false }: SectionTitleProps) {
  const label = level ? `NIVEAU ${String(level).padStart(2, '0')} · ${kicker}` : kicker
  return (
    <div className="mb-10 md:mb-14">
      <p className={`font-mono text-xs uppercase tracking-widest ${onGradient ? 'text-white' : 'text-bright'}`}>{label}</p>
      <h2 className="mt-3 font-anton text-5xl uppercase leading-none tracking-wide md:text-7xl">{children}</h2>
    </div>
  )
}

export default SectionTitle
