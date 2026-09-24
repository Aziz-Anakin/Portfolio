// React Bits « Card Swap » (https://reactbits.dev/components/card-swap), adapté :
// - `onChange(index)` signale la carte qui passe devant (pour synchroniser le texte),
// - `next()` exposé via ref pour avancer à la main,
// - pause au survol, hors écran et si l'utilisateur réduit les animations,
// - la première carte reste devant au chargement.
import { Children, cloneElement, createRef, forwardRef, isValidElement, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import gsap from 'gsap'

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute left-1/2 top-1/2 rounded-2xl border border-white/15 bg-slate-900 [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
))
Card.displayName = 'Card'

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
})

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  })

const CONFIG = {
  ease: 'elastic.out(0.6,0.9)',
  durDrop: 2,
  durMove: 2,
  durReturn: 2,
  promoteOverlap: 0.9,
  returnDelay: 0.05,
}

const CardSwap = forwardRef(function CardSwap(
  { width = 500, height = 400, cardDistance = 60, verticalDistance = 70, delay = 5000, skewAmount = 6, onCardClick, onChange, className = '', children },
  ref,
) {
  const childArr = useMemo(() => Children.toArray(children), [children])
  const count = childArr.length
  const refs = useMemo(() => Array.from({ length: count }, () => createRef()), [count])
  const order = useRef(Array.from({ length: count }, (_, i) => i))
  const tlRef = useRef(null)
  const swapRef = useRef(() => {})
  const container = useRef(null)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useImperativeHandle(ref, () => ({ next: () => swapRef.current() }), [])

  useEffect(() => {
    const total = refs.length
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount))

    let busy = false
    const swap = () => {
      if (order.current.length < 2 || busy) return
      busy = true
      const [front, ...rest] = order.current
      const elFront = refs[front].current
      const tl = gsap.timeline({ onComplete: () => { busy = false } })
      tlRef.current = tl
      onChangeRef.current?.(rest[0])

      tl.to(elFront, { y: '+=500', duration: CONFIG.durDrop, ease: CONFIG.ease })
      tl.addLabel('promote', `-=${CONFIG.durDrop * CONFIG.promoteOverlap}`)
      rest.forEach((idx, i) => {
        const el = refs[idx].current
        const slot = makeSlot(i, cardDistance, verticalDistance, total)
        tl.set(el, { zIndex: slot.zIndex }, 'promote')
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: CONFIG.durMove, ease: CONFIG.ease }, `promote+=${i * 0.15}`)
      })

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total)
      tl.addLabel('return', `promote+=${CONFIG.durMove * CONFIG.returnDelay}`)
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return')
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: CONFIG.durReturn, ease: CONFIG.ease }, 'return')
      tl.call(() => {
        order.current = [...rest, front]
      })
    }

    let intervalId = 0
    let hovered = false
    let visible = false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const restart = () => {
      clearInterval(intervalId)
      if (!reduced && visible && !hovered) intervalId = window.setInterval(swap, delay)
    }
    swapRef.current = () => {
      swap()
      restart()
    }

    const node = container.current
    const onEnter = () => {
      hovered = true
      restart()
    }
    const onLeave = () => {
      hovered = false
      restart()
    }
    node.addEventListener('mouseenter', onEnter)
    node.addEventListener('mouseleave', onLeave)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      restart()
    })
    observer.observe(node)

    return () => {
      node.removeEventListener('mouseenter', onEnter)
      node.removeEventListener('mouseleave', onLeave)
      observer.disconnect()
      clearInterval(intervalId)
      tlRef.current?.kill()
    }
  }, [refs, cardDistance, verticalDistance, delay, skewAmount])

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e)
            onCardClick?.(i)
          },
        })
      : child,
  )

  return (
    <div ref={container} className={`overflow-visible [perspective:900px] ${className}`} style={{ width, height }}>
      {rendered}
    </div>
  )
})

export default CardSwap
