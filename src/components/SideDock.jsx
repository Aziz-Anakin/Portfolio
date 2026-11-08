import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { NAV } from '../data/profile'

// Navigation latérale : un trait par slide, collé au bord droit de l’écran.
// Inspirée du « Dock » de React Bits : les traits s'allongent à l'approche du curseur
// et le nom de la section apparaît à côté du trait visé. Aucune boîte, aucun fond.
const SPRING = { mass: 0.12, stiffness: 180, damping: 14 }
const REACH = 96

function DockItem({ item, active, mouseY, reduced }) {
  const ref = useRef(null)

  // Distance verticale entre le curseur et le centre de la ligne.
  const distance = useTransform(mouseY, (y) => {
    const box = ref.current?.getBoundingClientRect()
    return box ? y - box.top - box.height / 2 : Infinity
  })
  const rest = active ? 28 : 14
  const grown = useSpring(useTransform(distance, [-REACH, 0, REACH], [rest, 44, rest]), SPRING)
  const labelOpacity = useTransform(distance, [-30, 0, 30], [0, 1, 0])
  const labelShift = useTransform(distance, [-30, 0, 30], [8, 0, 8])

  return (
    <a
      ref={ref}
      href={`#${item.id}`}
      aria-label={item.label}
      aria-current={active ? 'true' : undefined}
      className="group flex h-9 items-center justify-end gap-3 pl-24"
    >
      <motion.span
        style={reduced ? undefined : { opacity: labelOpacity, x: labelShift }}
        className="t-label whitespace-nowrap opacity-0 [text-shadow:0_0_14px_var(--bg),0_0_4px_var(--bg)] group-focus-visible:!opacity-100"
      >
        {item.label}
      </motion.span>
      <motion.span
        aria-hidden="true"
        style={{ width: reduced ? rest : grown }}
        className={`block rounded-full bg-white ${active ? 'h-[3px]' : 'h-[2px]'}`}
      />
    </a>
  )
}

function SideDock({ active }) {
  const reduced = useReducedMotion()
  const mouseY = useMotionValue(Infinity)

  return (
    <nav
      aria-label="Sections"
      onPointerMove={reduced ? undefined : (e) => e.pointerType !== 'touch' && mouseY.set(e.clientY)}
      onPointerLeave={() => mouseY.set(Infinity)}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end lg:flex"
    >
      {NAV.map((n) => (
        <DockItem key={n.id} item={n} active={active === n.id} mouseY={mouseY} reduced={reduced} />
      ))}
    </nav>
  )
}

export default SideDock
