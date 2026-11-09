import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utilitaire shadcn : assemble des classes Tailwind sans conflit.
export const cn = (...inputs) => twMerge(clsx(inputs))
