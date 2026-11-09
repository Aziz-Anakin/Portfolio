// Section de page : filet en haut, contenu centré. `id` sert d'ancre du menu.
import type { ReactNode } from 'react'

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="relative overflow-x-clip border-t border-line">
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">{children}</div>
    </section>
  )
}

export default Section
