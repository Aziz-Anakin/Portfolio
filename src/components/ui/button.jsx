import { cva } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'

// Bouton à la shadcn : rectangle plat, texte en capitales mono, curseur « _ » à la fin.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border font-mono text-sm font-bold uppercase tracking-widest transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 'border-azure bg-azure text-white hover:border-white hover:bg-white hover:text-azure',
        light: 'border-white bg-white text-azure hover:bg-transparent hover:text-white',
        outline: 'border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink',
        ghost: 'border-transparent bg-transparent text-white hover:bg-white/10',
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, buttonVariants }
