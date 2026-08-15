import { motion } from 'motion/react'
import { useEffect, useRef, useState, useMemo } from 'react'

export default function BlurText({
  text = '',
  delay = 80,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  tag: Tag = 'p',
  stepDuration = 0.4,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { setInView(entry.isIntersecting) },
      { threshold }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  const from = useMemo(() => (
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -30 }
      : { filter: 'blur(10px)', opacity: 0, y: 30 }
  ), [direction])

  const to = useMemo(() => [
    { filter: 'blur(4px)', opacity: 0.5, y: direction === 'top' ? 4 : -4 },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ], [direction])

  const totalDuration = stepDuration * to.length
  const times = to.length === 1 ? [0, 1] : [0, ...to.map((_, i) => (i + 1) / to.length)]

  const keyframes = useMemo(() => {
    const keys = new Set([...Object.keys(from), ...to.flatMap(s => Object.keys(s))])
    const kf = {}
    keys.forEach(k => { kf[k] = [from[k], ...to.map(s => s[k])] })
    return kf
  }, [from, to])

  return (
    <Tag ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((seg, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={from}
          animate={inView ? keyframes : from}
          transition={{ duration: totalDuration, times, delay: (i * delay) / 1000 }}
        >
          {seg === ' ' ? ' ' : seg}
          {animateBy === 'words' && i < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </Tag>
  )
}
