import type { ComponentProps } from 'react'
import { cn } from '../../lib/utils'

// Étiquette rectangulaire (technologie, tag).
export function Badge({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('inline-flex items-center gap-2 border border-line px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-white', className)} {...props} />
}
