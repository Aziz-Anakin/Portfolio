import { useEffect, useRef } from 'react'

// Serpent qui joue tout seul sur la grille de la bannière d'accueil : il va chercher des pommes, grandit,
// et recommence quand il est trop long ou coincé. Décoratif, aucune interaction.
// Aligné sur la grille de fond (ShapeGrid, `cell` doit être la même taille et la grille immobile).
// La zone est la partie de la bannière à droite du texte : on la mesure avec les éléments `[data-avoid]`.
const STEP = 130 // ms entre deux pas
const START_LENGTH = 4
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]]

const key = (x, y) => `${x},${y}`

// Plus court chemin (largeur d'abord) de `from` vers `to`, sans traverser `blocked`. Renvoie la 1ʳᵉ case à prendre.
function firstStep(from, to, blocked, cols, rows) {
  const queue = [[from[0], from[1]]]
  const prev = new Map([[key(from[0], from[1]), null]])
  while (queue.length) {
    const [x, y] = queue.shift()
    if (x === to[0] && y === to[1]) {
      let cur = [x, y]
      let p = prev.get(key(cur[0], cur[1]))
      while (p && !(p[0] === from[0] && p[1] === from[1])) {
        cur = p
        p = prev.get(key(cur[0], cur[1]))
      }
      return cur
    }
    for (const [dx, dy] of DIRS) {
      const nx = x + dx
      const ny = y + dy
      const k = key(nx, ny)
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || blocked.has(k) || prev.has(k)) continue
      prev.set(k, [x, y])
      queue.push([nx, ny])
    }
  }
  return null
}

// Cases libres accessibles depuis une case : sert à ne pas s'enfermer.
function reachable(from, blocked, cols, rows) {
  const seen = new Set([key(from[0], from[1])])
  const stack = [from]
  while (stack.length) {
    const [x, y] = stack.pop()
    for (const [dx, dy] of DIRS) {
      const nx = x + dx
      const ny = y + dy
      const k = key(nx, ny)
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || blocked.has(k) || seen.has(k)) continue
      seen.add(k)
      stack.push([nx, ny])
    }
  }
  return seen.size
}

function SnakeGrid({ cell = 56, speed = 1, below = false }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const banner = wrap?.parentElement
    if (!wrap || !canvas || !banner) return undefined
    const ctx = canvas.getContext('2d')
    let raf = 0
    let timer = 0
    let cols = 0
    let rows = 0
    let snake = []
    let apple = [0, 0]
    let dir = [1, 0]
    let flash = 0

    const placeApple = () => {
      const taken = new Set(snake.map(([x, y]) => key(x, y)))
      const free = []
      for (let x = 0; x < cols; x++) for (let y = 0; y < rows; y++) if (!taken.has(key(x, y))) free.push([x, y])
      apple = free[Math.floor(Math.random() * free.length)] || [0, 0]
    }
    const restart = () => {
      const y = Math.floor(rows / 2)
      snake = Array.from({ length: START_LENGTH }, (_, i) => [START_LENGTH - 1 - i, y])
      dir = [1, 0]
      placeApple()
    }

    // Mesure : la zone du serpent va de la fin du texte jusqu'au bord droit de la bannière, en cellules entières.
    const layout = () => {
      const b = banner.getBoundingClientRect()
      let right = 0
      banner.querySelectorAll('[data-avoid]').forEach((el) => {
        const r = document.createRange()
        r.selectNodeContents(el)
        right = Math.max(right, r.getBoundingClientRect().right - b.left)
      })
      let startCol = Math.ceil((right + 48) / cell)
      let endCol = Math.floor(b.width / cell)
      let topRow = 1
      const bottomRow = Math.floor(b.height / cell) - 1
      // Téléphone : le texte occupe toute la largeur, le serpent joue dans la bande libre sous les boutons
      // (éléments `[data-below]`), et la grille est plus fine.
      if (below) {
        let bottom = 0
        banner.querySelectorAll('[data-below]').forEach((el) => {
          bottom = Math.max(bottom, el.getBoundingClientRect().bottom - b.top)
        })
        startCol = 1
        endCol = Math.floor(b.width / cell) - 1
        topRow = Math.ceil(bottom / cell) + 1
      }
      cols = endCol - startCol
      rows = bottomRow - topRow
      const show = cols >= 4 && rows >= 3
      wrap.style.display = show ? 'block' : 'none'
      if (!show) return false
      Object.assign(wrap.style, { left: `${startCol * cell}px`, top: `${topRow * cell}px`, width: `${cols * cell}px`, height: `${rows * cell}px` })
      const dpr = window.devicePixelRatio || 1
      canvas.width = cols * cell * dpr
      canvas.height = rows * cell * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      restart()
      return true
    }

    const step = () => {
      const head = snake[0]
      const bodyBlocked = new Set(snake.slice(0, -1).map(([x, y]) => key(x, y)))
      let next = firstStep(head, apple, bodyBlocked, cols, rows)
      // Il ne doit pas s'enfermer : après avoir pris ce chemin, de la place doit rester devant lui.
      if (next) {
        const after = new Set([...bodyBlocked, key(head[0], head[1])])
        if (reachable(next, after, cols, rows) < snake.length) next = null
      }
      if (!next) {
        // Pas de chemin sûr vers la pomme : il suit sa queue, ou prend la case qui lui laisse le plus de place.
        const tail = snake[snake.length - 1]
        next = firstStep(head, tail, new Set(snake.slice(0, -1).map(([x, y]) => key(x, y))), cols, rows)
        if (!next) {
          let best = null
          let bestRoom = -1
          for (const [dx, dy] of DIRS) {
            const nx = head[0] + dx
            const ny = head[1] + dy
            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || bodyBlocked.has(key(nx, ny))) continue
            const room = reachable([nx, ny], new Set([...bodyBlocked, key(head[0], head[1])]), cols, rows)
            if (room > bestRoom) {
              bestRoom = room
              best = [nx, ny]
            }
          }
          next = best
        }
      }
      if (!next) {
        // Coincé : il clignote, puis repart de zéro.
        flash = 6
        restart()
        return
      }
      dir = [next[0] - head[0], next[1] - head[1]]
      snake.unshift(next)
      if (next[0] === apple[0] && next[1] === apple[1]) {
        if (snake.length >= Math.min(26, Math.floor(cols * rows * 0.4))) {
          flash = 6 // assez long : on célèbre et on recommence
          restart()
        } else {
          placeApple()
        }
      } else {
        snake.pop()
      }
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, cols * cell, rows * cell)
      const inset = 6
      const size = cell - inset * 2
      // Pomme : carré rose qui pulse.
      const pulse = 0.75 + 0.25 * Math.sin(now / 160)
      ctx.fillStyle = `rgba(255, 95, 183, ${pulse})`
      ctx.shadowColor = '#ff5fb7'
      ctx.shadowBlur = 14
      ctx.fillRect(apple[0] * cell + inset + 6, apple[1] * cell + inset + 6, size - 12, size - 12)
      ctx.shadowBlur = 0
      // Corps : blanc qui s'estompe vers la queue. La tête est pleine, avec deux yeux.
      const n = snake.length
      snake.forEach(([x, y], i) => {
        const a = flash > 0 && flash % 2 === 0 ? 0.25 : 1 - (i / n) * 0.65
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`
        ctx.fillRect(x * cell + inset, y * cell + inset, size, size)
      })
      const [hx, hy] = snake[0]
      ctx.fillStyle = '#2b1a6b'
      const ex = dir[0] === 0 ? [14, size - 14 - 8] : dir[0] > 0 ? [size - 22, size - 22] : [14, 14]
      const ey = dir[1] === 0 ? [14, size - 14 - 8] : dir[1] > 0 ? [size - 22, size - 22] : [14, 14]
      ctx.fillRect(hx * cell + inset + ex[0], hy * cell + inset + ey[0], 8, 8)
      ctx.fillRect(hx * cell + inset + ex[1], hy * cell + inset + ey[1], 8, 8)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = () => {
      cancelAnimationFrame(raf)
      clearInterval(timer)
      if (!layout()) return
      // Pour l'image fixe (mouvements réduits), on fait avancer le serpent un peu avant de le figer.
      for (let i = 0; i < 9; i++) step()
      const loop = (now) => {
        draw(now)
        raf = requestAnimationFrame(loop)
      }
      if (reduce) {
        draw(0)
        return
      }
      raf = requestAnimationFrame(loop)
      timer = setInterval(() => {
        if (document.hidden) return
        if (flash > 0) flash--
        step()
      }, STEP / speed)
    }

    start()
    const ro = new ResizeObserver(start)
    ro.observe(banner)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(timer)
      ro.disconnect()
    }
  }, [cell, speed, below])

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

export default SnakeGrid
