// React Bits « Star Border » (https://reactbits.dev/animations/star-border) :
// deux éclats lumineux qui glissent le long de la bordure.
function StarBorder({ as: Component = 'div', className = '', innerClassName = '', color = '#60a5fa', speed = '6s', thickness = 1, children, ...rest }) {
  return (
    <Component
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{ padding: `${thickness}px`, ...rest.style }}
      {...rest}
    >
      <div
        className="absolute bottom-[-11px] right-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70 motion-safe:animate-star-movement-bottom"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div
        className="absolute left-[-250%] top-[-10px] z-0 h-[50%] w-[300%] rounded-full opacity-70 motion-safe:animate-star-movement-top"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div className={`relative z-[1] h-full rounded-[calc(1.5rem-1px)] ${innerClassName}`}>{children}</div>
    </Component>
  )
}

export default StarBorder
