import { Badge } from './ui/badge.jsx'
import { TECH } from '../data/tech'

// Technologies d'un projet ou d'une expérience : logo (s'il existe) et nom, en badges rectangulaires.
function TechBadges({ names, className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {names.map((name) => {
        const tech = TECH[name]
        return (
          <li key={name}>
            <Badge>
              {tech?.logo && <img src={tech.logo} alt="" loading="lazy" decoding="async" width="16" height="16" className={`h-4 w-4 object-contain ${tech.invert ? 'brightness-0 invert' : ''}`} />}
              {name}
            </Badge>
          </li>
        )
      })}
    </ul>
  )
}

export default TechBadges
