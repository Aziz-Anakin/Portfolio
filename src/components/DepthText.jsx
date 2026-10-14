// React Bits « Depth Text » (https://reactbits.dev/c/text-animations/depth-text),
// adapté : rotation automatique (pas de suivi de la souris), pause hors écran,
// couleurs en variables CSS (clair / sombre) et variante pour la photo.
import { useEffect, useMemo, useRef } from 'react'

const MAX_LAYERS = 64

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const getLayerColor = (faceColor, depthColor, index, total) => {
  const progress = total <= 1 ? 1 : index / total
  const eased = progress * progress
  const faceMix = Math.round((1 - eased) * 72 + 4)
  return `color-mix(in srgb, ${faceColor} ${faceMix}%, ${depthColor})`
}

const getTransform = (rotateX, rotateY) => `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`

// Fait tourner la scène tout seul ; l'animation s'arrête quand l'élément sort de l'écran.
function useAutoOrbit({ tilt, orbitSpeed, smoothing, phase = 0 }) {
  const rootRef = useRef(null)
  const stageRef = useRef(null)

  const safeTilt = clamp(Number(tilt) || 0, 0, 16)
  const safeSmoothing = clamp(Number(smoothing) || 0.14, 0.02, 0.35)
  const safeOrbitSpeed = clamp(Number(orbitSpeed) || 0, 0, 2)
  const base = useMemo(() => ({ x: -safeTilt * 0.32, y: safeTilt * 0.42 }), [safeTilt])

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return undefined

    stage.style.transform = getTransform(base.x, base.y)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frameId = 0
    const startTime = performance.now()
    const current = { ...base }

    const tick = (now) => {
      const orbit = ((now - startTime) / 1000) * safeOrbitSpeed * Math.PI * 2 + phase
      const targetX = base.x + Math.sin(orbit) * safeTilt * 0.55
      const targetY = base.y + Math.cos(orbit * 0.85) * safeTilt * 0.55
      current.x += (targetX - current.x) * safeSmoothing
      current.y += (targetY - current.y) * safeSmoothing
      stage.style.transform = getTransform(current.x, current.y)
      frameId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frameId)
      if (entry.isIntersecting) frameId = requestAnimationFrame(tick)
    })
    observer.observe(root)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [base, phase, safeOrbitSpeed, safeSmoothing, safeTilt])

  return { rootRef, stageRef, base }
}

const stageStyleFor = (base) => ({
  transformStyle: 'preserve-3d',
  transform: getTransform(base.x, base.y),
  transformOrigin: '50% 50%',
  willChange: 'transform',
})

const rootStyleFor = (perspective, style) => ({
  ...style,
  perspective: `${clamp(Number(perspective) || 900, 300, 2000)}px`,
  perspectiveOrigin: '50% 48%',
  isolation: 'isolate',
})

function DepthText({
  text,
  as: Tag = 'span',
  layers = 24,
  depth = 2,
  faceColor = 'var(--depth-face)',
  depthColor = 'var(--depth-back)',
  tilt = 7.5,
  smoothing = 0.14,
  perspective = 900,
  orbitSpeed = 0.2,
  phase = 0,
  fontSize = 'clamp(2.25rem, 8vw, 3rem)',
  fontWeight = 400,
  letterSpacing = '0.025em',
  shadow = true,
  className = '',
  style = {},
}) {
  const { rootRef, stageRef, base } = useAutoOrbit({ tilt, orbitSpeed, smoothing, phase })

  const safeLayers = clamp(Math.round(Number(layers) || 1), 2, MAX_LAYERS)
  const safeDepth = clamp(Number(depth) || 0, 0, 12)

  const depthLayers = useMemo(
    () =>
      Array.from({ length: safeLayers }, (_, layerIndex) => {
        const index = safeLayers - layerIndex
        return {
          index,
          color: getLayerColor(faceColor, depthColor, index, safeLayers),
          transform: `translateZ(${-index * safeDepth}px)`,
        }
      }),
    [safeLayers, safeDepth, faceColor, depthColor],
  )

  const textStyle = {
    fontSize,
    fontWeight,
    lineHeight: 1,
    letterSpacing,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
  }

  return (
    <Tag ref={rootRef} className={`inline-block ${className}`.trim()} style={rootStyleFor(perspective, style)}>
      <span ref={stageRef} className="relative inline-grid place-items-center" style={stageStyleFor(base)}>
        {depthLayers.map((layer) => (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 inline-block"
            key={layer.index}
            style={{ ...textStyle, color: layer.color, transform: layer.transform }}
          >
            {text}
          </span>
        ))}
        <span
          className="relative z-10 inline-block"
          style={{
            ...textStyle,
            color: faceColor,
            textShadow: shadow
              ? `0 18px 28px color-mix(in srgb, ${depthColor} 32%, transparent), 0 4px 8px rgba(0, 0, 0, 0.22)`
              : 'none',
            transform: 'translateZ(0.6px)',
          }}
        >
          {text}
        </span>
      </span>
    </Tag>
  )
}

// Même effet appliqué à une image ronde : une pièce extrudée qui tourne toute seule.
export function DepthImage({
  src,
  alt,
  layers = 20,
  depth = 2.2,
  faceColor = 'var(--depth-face)',
  depthColor = 'var(--depth-back)',
  tilt = 12,
  smoothing = 0.14,
  perspective = 900,
  orbitSpeed = 0.2,
  className = '',
  imgClassName = '',
}) {
  const { rootRef, stageRef, base } = useAutoOrbit({ tilt, orbitSpeed, smoothing })

  const safeLayers = clamp(Math.round(Number(layers) || 1), 2, MAX_LAYERS)
  const safeDepth = clamp(Number(depth) || 0, 0, 12)

  return (
    <div ref={rootRef} className={`inline-block ${className}`.trim()} style={rootStyleFor(perspective)}>
      <div ref={stageRef} className="relative" style={stageStyleFor(base)}>
        {Array.from({ length: safeLayers }, (_, layerIndex) => {
          const index = safeLayers - layerIndex
          return (
            <span
              aria-hidden="true"
              key={index}
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background: getLayerColor(faceColor, depthColor, index, safeLayers),
                transform: `translateZ(${-index * safeDepth}px)`,
              }}
            />
          )
        })}
        <img
          src={src}
          alt={alt}
          className={`relative block rounded-full object-cover ${imgClassName}`.trim()}
          style={{ transform: 'translateZ(0.6px)', backfaceVisibility: 'hidden' }}
        />
      </div>
    </div>
  )
}

export default DepthText
