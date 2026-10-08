import { TECH } from '../data/tech'

// Liste de technologies : logo (s'il existe) + nom. `names` renvoie aux clés de data/tech.js.
function TechList({ names, className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2.5 ${className}`}>
      {names.map((name) => {
        const tech = TECH[name]
        return (
          <li key={name} className="t-data flex items-center gap-2">
            {tech?.logo && (
              <img
                src={tech.logo}
                alt=""
                loading="lazy"
                decoding="async"
                width="18"
                height="18"
                className={`h-[18px] w-[18px] object-contain ${tech.invert ? 'brightness-0 invert' : ''}`}
              />
            )}
            {name}
          </li>
        )
      })}
    </ul>
  )
}

export default TechList
