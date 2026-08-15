import opMark from '../assets/marks/one-piece-emblem.svg'
import BlurText from './BlurText.jsx'
import { useEffect, useRef, useState } from 'react'

function SectionHeading({ title, align = 'left', mark = opMark }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`mb-10 sm:mb-12 flex flex-col ${alignment}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <BlurText
          text={title}
          tag="h2"
          animateBy="words"
          direction="top"
          delay={100}
          className="heading-shadow font-anton text-4xl sm:text-5xl uppercase tracking-wide leading-none text-slate-900 dark:text-white"
        />
        <img
          src={mark}
          alt=""
          aria-hidden="true"
          className="h-16 w-16 sm:h-20 sm:w-20 object-contain shrink-0 -translate-y-1 rotate-[8deg] select-none opacity-80 dark:[filter:drop-shadow(1px_0_0_white)_drop-shadow(-1px_0_0_white)_drop-shadow(0_1px_0_white)_drop-shadow(0_-1px_0_white)_drop-shadow(1px_1px_0_white)_drop-shadow(-1px_-1px_0_white)_drop-shadow(1px_-1px_0_white)_drop-shadow(-1px_1px_0_white)]"
        />
      </div>
      <span
        aria-hidden="true"
        className={`mt-4 h-1 rounded-full bg-blue-600 transition-all duration-700 delay-300 ${visible ? 'w-14 opacity-100' : 'w-0 opacity-0'}`}
      />
    </div>
  )
}

export default SectionHeading
