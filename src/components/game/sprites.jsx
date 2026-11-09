// Sprites du mini-jeu : Pac-Man, fantômes et bonus en pixel art (SVG, sans image).
export const GHOST_COLORS = ['#ff5fb7', '#4f6bff', '#4fe3ff', '#b07cff']

// Pac-Man : deux demi-disques qui s'ouvrent et se ferment (voir .pac-top / .pac-bottom dans site.css).
export function PacMan({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path className="pac-top" fill="#ffd84d" d="M0 16A16 16 0 0 1 32 16Z" />
      <path className="pac-bottom" fill="#ffd84d" d="M0 16A16 16 0 0 0 32 16Z" />
    </svg>
  )
}

// Fantôme : normal (couleur + yeux qui regardent dans la direction), apeuré (bleu, bouche en zigzag,
// qui clignote à la fin) ou réduit à ses yeux (mangé, il rentre).
export function Ghost({ color, mode = 'chase', look = 1, flash = false, size = 28 }) {
  const eyes = mode === 'eyes'
  const scared = mode === 'scared'
  const body = scared ? (flash ? '#ffffff' : '#2b3cff') : color
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      {/* Deux positions de « pieds » qui alternent : le fantôme ondule en avançant (voir .ghost-foot-a/b). */}
      {!eyes && <path className="ghost-foot-a" fill={body} d="M2 27V14a12 12 0 0 1 24 0v13l-4-4-4 4-4-4-4 4-4-4Z" />}
      {!eyes && <path className="ghost-foot-b" fill={body} d="M2 24V14a12 12 0 0 1 24 0v10l-3 3-4-3-4 3-4-3-4 3-5-3Z" />}
      {scared ? (
        <>
          <rect x="8" y="10" width="4" height="4" fill={flash ? '#2b3cff' : '#fff'} />
          <rect x="16" y="10" width="4" height="4" fill={flash ? '#2b3cff' : '#fff'} />
          <path fill="none" stroke={flash ? '#2b3cff' : '#fff'} strokeWidth="1.6" d="M6 20l3-3 3 3 3-3 3 3 3-3 2 2" />
        </>
      ) : (
        <>
          <circle cx="10" cy="13" r="3.6" fill="#fff" />
          <circle cx="18" cy="13" r="3.6" fill="#fff" />
          <circle cx={10 + look * 1.4} cy="13" r="1.8" fill="#1b1b6b" />
          <circle cx={18 + look * 1.4} cy="13" r="1.8" fill="#1b1b6b" />
        </>
      )}
    </svg>
  )
}

// Bonus en pixel art : chaque ligne est une rangée de pixels. # = couleur de base, o = clair, s = crème.
const PIXELS = {
  coin: { fill: '#ffd84d', light: '#fff3a6', rows: ['..##..', '.#oo#.', '#oo###', '#oo###', '######', '######', '.####.', '..##..'] },
  heart: { fill: '#ff5fb7', light: '#ffc2e6', rows: ['.##..##.', '#oo####o', '########', '.######.', '..####..', '...##...'] },
  cherry: { fill: '#ff3b6b', light: '#ffc2d4', cream: '#5ee38a', rows: ['....ss..', '...s..s.', '..s...s.', '.##..##.', '#o##.#o#', '####.###', '.##..##.'] },
  star: { fill: '#ffd84d', light: '#fff3a6', rows: ['...#...', '...#...', '..###..', '#######', '.#####.', '..###..', '.##.##.', '.#...#.'] },
  mushroom: { fill: '#b07cff', light: '#ffffff', cream: '#fff0d6', rows: ['..####..', '.#oo###.', '##oo#oo#', '########', '.ssssss.', '.ss..ss.', '.ssssss.'] },
}

export function Pixel({ kind = 'coin', size = 4 }) {
  const sprite = PIXELS[kind]
  const w = sprite.rows[0].length
  return (
    <svg width={w * size} height={sprite.rows.length * size} viewBox={`0 0 ${w} ${sprite.rows.length}`} shapeRendering="crispEdges" aria-hidden="true">
      {sprite.rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={c === 'o' ? sprite.light : c === 's' ? sprite.cream : sprite.fill} />,
        ),
      )}
    </svg>
  )
}
