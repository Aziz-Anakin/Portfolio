import { cn } from '../../lib/utils'

// Carte à la shadcn : panneau plat, filet fin, aucun arrondi.
export function Card({ className, ...props }) {
  return <div className={cn('border border-line bg-panel transition-colors duration-300', className)} {...props} />
}

// En-tête d'une carte : étiquette mono précédée d'un petit carré rose à gauche, élément libre à droite.
export function CardLabel({ children, className, aside }) {
  return (
    <div className={cn('flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-bright', className)}>
      <span className="flex items-center gap-2">
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-pink" />
        {children}
      </span>
      {aside}
    </div>
  )
}

export function CardTitle({ className, as: Tag = 'h3', ...props }) {
  return <Tag className={cn('font-anton text-3xl uppercase leading-none tracking-wide md:text-4xl', className)} {...props} />
}
