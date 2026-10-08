import { motion, useReducedMotion } from 'motion/react'

// Apparition au scroll : le bloc monte légèrement et devient opaque la première fois
// qu'il entre à l'écran. Sans effet si l'utilisateur a réduit les animations.
function Reveal({ as = 'div', delay = 0, y = 24, children, ...props }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  if (reduce) {
    const Plain = as
    return <Plain {...props}>{children}</Plain>
  }

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Reveal
