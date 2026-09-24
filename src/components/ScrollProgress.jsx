import { motion, useScroll, useSpring } from 'motion/react'

// Fine barre qui se remplit au fil du défilement.
function ScrollProgress({ className = '' }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className={`h-[2px] origin-left rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 ${className}`}
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress
