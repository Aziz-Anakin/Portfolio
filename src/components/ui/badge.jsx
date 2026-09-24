import { cn } from '../../lib/utils.js'

const variants = {
  default: 'border-white/10 bg-white/5 text-white',
  outline: 'border-white/15 bg-transparent text-white/80',
  accent: 'border-blue-400/30 bg-blue-500/10 text-blue-300',
}

function Badge({ className, variant = 'default', ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
