// « Le site se construit comme dans un outil de design » : quand un élément entre à l'écran, un petit groupe de curseurs
// (comme des collaborateurs en direct) vient le tracer, puis le remplir.
//
//   1. Fil de fer : un curseur file jusqu'au coin de l'élément, prend la croix de visée et tire un cadre de sélection
//      (4 poignées, taille « largeur × hauteur » qui grandit en direct).
//   2. Contenu : un texte est tapé lettre par lettre par un curseur de texte ; une boîte reçoit un clic puis apparaît.
//      Un parent est toujours fini avant ses enfants.
//
// Aucune bibliothèque : une horloge à requestAnimationFrame, une file de tâches que les curseurs libres se partagent,
// et un balayage du DOM qui repère les éléments (voir `scan`). Le contenu reste dans la page tout du long (même texte,
// mêmes nœuds : les lettres sont remises dans leurs nœuds d'origine à la fin). Rien ne se déclenche avec
// `prefers-reduced-motion` : la page s'affiche finie.
//
// Marquage dans le code des composants (attribut `data-build`) :
//   "box"   : cadre dessiné puis clic (cartes, boutons, panneaux) ; ses enfants sont construits ensuite
//   "solid" : comme « box », mais l'intérieur est un seul bloc (carrousel, pile de cartes qui bougent)
//   "skip"  : jamais touché (contenu qui change tout seul, compteurs, machine à écrire)
// Les textes (éléments qui portent du texte direct) et les images sont repérés tout seuls.

type Kind = 'text' | 'box'

type Item = {
  el: HTMLElement
  kind: Kind
  parent: Item | null
  requested: boolean
  done: boolean
  wire: HTMLElement | null
  split: { orig: Text; spans: HTMLElement[] }[] | null
  ready: Promise<void>
  finish: () => void
}

type Agent = {
  i: number
  x: number
  y: number
  el: HTMLElement
  color: string
  idle: boolean
  idleSince: number
  mode: (m: 'arrow' | 'cross' | 'ibeam') => void
  click: () => void
  moveTo: (x: number, y: number, dur?: number) => Promise<void>
}

type Tween = { t0: number; dur: number; fn: (k: number) => void; res: () => void }
type Timer = { t: number; res: () => void }

const COLORS = ['#ff5fb7', '#4f6bff', '#b9a4ff', '#7c3aed', '#35e0c2']
const ROLES = ['layout', 'texte', 'couleur', 'code', 'pixels']
const INLINE = new Set(['A', 'B', 'I', 'EM', 'STRONG', 'SPAN', 'BR', 'SMALL', 'CODE', 'MARK', 'SUB', 'SUP', 'U', 'ABBR', 'TIME', 'IMG', 'svg', 'SVG'])
const NEVER = new Set(['SCRIPT', 'STYLE', 'CANVAS', 'SVG', 'svg', 'NOSCRIPT', 'DIALOG', 'IFRAME', 'VIDEO', 'AUDIO', 'PATH'])

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const rnd = (a: number, b: number) => a + Math.random() * (b - a)
const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)
const now = () => performance.now()

const ARROW = (c: string) =>
  `<svg class="bd-arrow" viewBox="0 0 17 22" aria-hidden="true"><path d="M2 1.5v16l4.4-4 3 7 2.6-1.1-3-6.9h6z" fill="${c}" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg>`
const CROSS =
  '<svg class="bd-cross" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 1v16M1 9h16" stroke="#14111f" stroke-width="4.4"/><path d="M9 1v16M1 9h16" stroke="#fff" stroke-width="2"/></svg>'
const IBEAM =
  '<svg class="bd-ibeam" viewBox="0 0 18 18" aria-hidden="true"><path d="M5.5 1.5h7M5.5 16.5h7M9 1.5v15" stroke="#14111f" stroke-width="4.2"/><path d="M5.5 1.5h7M5.5 16.5h7M9 1.5v15" stroke="#fff" stroke-width="1.8"/></svg>'

export type BuildEngine = { destroy: () => void }

export function startBuild(root: HTMLElement): BuildEngine {
  const html = document.documentElement
  const tweens = new Set<Tween>()
  const timers = new Set<Timer>()
  const items: Item[] = []
  const itemOf = new Map<Element, Item>()
  const agents: Agent[] = []
  const jobs: ((a: Agent) => Promise<void>)[] = []
  const waiters: { a: Agent; res: (job: (a: Agent) => Promise<void>) => void }[] = []
  const pending = new Set<Item>()
  let alive = true
  let raf = 0
  let flushTimer = 0
  const basePace = 1
  let pace = basePace
  let backlog = 0

  const wait = (ms: number) => new Promise<void>((res) => { timers.add({ t: now() + ms / pace, res }); kick() })
  const tween = (dur: number, fn: (k: number) => void) =>
    new Promise<void>((res) => { tweens.add({ t0: now(), dur: Math.max(1, dur / pace), fn, res }); kick() })

  // ---------- calque des curseurs ----------
  const stage = document.createElement('div')
  stage.className = 'bd-stage'
  stage.setAttribute('aria-hidden', 'true')
  document.body.appendChild(stage)

  const count = 5

  const rectOf = (el: Element) => {
    const r = el.getBoundingClientRect()
    return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }
  }
  const nearViewport = (r: { y: number; h: number }) => r.y + r.h > scrollY - 300 && r.y < scrollY + innerHeight + 300

  function makeAgent(i: number): Agent {
    const el = document.createElement('div')
    el.className = 'bd-agent'
    el.dataset.gone = ''
    el.dataset.mode = 'arrow'
    const color = COLORS[i % COLORS.length]
    el.innerHTML = `${ARROW(color)}${CROSS}${IBEAM}<span class="bd-ring" style="border-color:${color}"></span><label style="background:${color}">${ROLES[i % ROLES.length]}</label>`
    stage.appendChild(el)
    const a: Agent = {
      i, x: scrollX + innerWidth / 2, y: scrollY + innerHeight / 2, el, color, idle: true, idleSince: now(),
      mode: (m) => { el.dataset.mode = m },
      click: () => { el.classList.remove('click'); void el.offsetWidth; el.classList.add('click') },
      moveTo: (x, y, dur) => {
        const sx = a.x, sy = a.y, dx = x - sx, dy = y - sy, d = Math.hypot(dx, dy) || 1
        const t = dur ?? clamp(160 + d * 0.45, 200, 700)
        const bend = rnd(-1, 1) * Math.min(120, d * 0.25)
        const cx = (sx + x) / 2 - (dy / d) * bend, cy = (sy + y) / 2 + (dx / d) * bend
        return tween(t, (k) => {
          const e = ease(k), u = 1 - e
          a.x = u * u * sx + 2 * u * e * cx + e * e * x
          a.y = u * u * sy + 2 * u * e * cy + e * e * y
        })
      },
    }
    return a
  }

  // ---------- horloge ----------
  function frame() {
    raf = 0
    if (!alive) return
    const t = now()
    for (const tm of [...timers]) if (t >= tm.t) { timers.delete(tm); tm.res() }
    for (const tw of [...tweens]) {
      const k = Math.min(1, (t - tw.t0) / tw.dur)
      tw.fn(k)
      if (k >= 1) { tweens.delete(tw); tw.res() }
    }
    for (const a of agents) {
      a.el.style.transform = `translate3d(${a.x.toFixed(1)}px,${a.y.toFixed(1)}px,0)`
      // Un curseur sans travail disparaît au bout d'un moment ; la boucle s'arrête quand tout le monde est parti.
      if (a.idle && a.el.dataset.gone === undefined && t - a.idleSince > 1700) a.el.dataset.gone = ''
    }
    if (tweens.size || timers.size || agents.some((a) => a.el.dataset.gone === undefined)) raf = requestAnimationFrame(frame)
  }
  function kick() {
    if (!raf && alive) raf = requestAnimationFrame(frame)
  }

  // ---------- file de tâches : les curseurs libres prennent la plus proche ----------
  function dispatch(fn: (a: Agent) => Promise<void>, at?: { x: number; y: number }) {
    return new Promise<void>((res) => {
      const job = async (a: Agent) => { try { await fn(a) } catch (e) { console.error(e) } res() }
      if (waiters.length) {
        let bi = 0, bd = Infinity
        waiters.forEach((w, i) => { const d = at ? Math.hypot(w.a.x - at.x, w.a.y - at.y) : 0; if (d < bd) { bd = d; bi = i } })
        waiters.splice(bi, 1)[0].res(job)
      } else jobs.push(job)
    })
  }
  async function live(a: Agent) {
    for (;;) {
      const job = jobs.shift() ?? (await new Promise<(a: Agent) => Promise<void>>((res) => waiters.push({ a, res })))
      if (!alive) return
      a.idle = false
      if (a.el.dataset.gone !== undefined) {
        // Il revient d'un peu à côté de son travail, pas de l'autre bout de la page.
        a.x = scrollX + rnd(40, innerWidth - 40); a.y = scrollY + rnd(60, innerHeight - 60)
        delete a.el.dataset.gone
        kick()
      }
      await job(a)
      a.mode('arrow'); a.idle = true; a.idleSince = now()
      kick()
    }
  }

  // ---------- repérage des éléments ----------
  function skipped(el: Element) {
    const h = el as HTMLElement
    return NEVER.has(el.tagName) || h.dataset?.build === 'skip' || el.classList.contains('sr-only') || el.getAttribute('aria-hidden') === 'true' || h.hidden
  }
  function hasOwnText(el: Element) {
    return [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim() !== '')
  }
  function allInline(el: Element) {
    return [...el.children].every((c) => INLINE.has(c.tagName) && !(c as HTMLElement).dataset.build)
  }
  function add(el: HTMLElement, kind: Kind, parent: Item | null) {
    const it: Item = { el, kind, parent, requested: false, done: false, wire: null, split: null, ready: Promise.resolve(), finish: () => {} }
    it.ready = new Promise<void>((r) => { it.finish = r })
    items.push(it); itemOf.set(el, it)
    el.dataset.b = kind
    return it
  }
  function scan(el: Element, parent: Item | null) {
    if (skipped(el)) return
    const h = el as HTMLElement
    const mode = h.dataset.build
    if (mode === 'box' || mode === 'solid') {
      const it = add(h, 'box', parent)
      if (mode === 'box') for (const c of el.children) scan(c, it)
      return
    }
    if (el instanceof HTMLImageElement) { add(el, 'box', parent); return }
    if (hasOwnText(el) && allInline(el)) { add(h, 'text', parent); return }
    for (const c of el.children) scan(c, parent)
  }

  // ---------- fil de fer ----------
  function mkWire(r: { x: number; y: number; w: number; h: number }) {
    const w = document.createElement('div')
    w.className = 'bd-wire' + (r.w < 56 ? ' sm' : '')
    w.innerHTML = '<u></u><u></u><u></u><u></u><em></em>'
    w.style.cssText = `left:${r.x}px;top:${r.y}px;width:0;height:0`
    stage.appendChild(w)
    return w
  }
  async function wireJob(a: Agent, it: Item) {
    const r = rectOf(it.el)
    if (r.w < 6 || r.h < 6 || !nearViewport(r)) return
    await a.moveTo(r.x, r.y)
    a.mode('cross')
    const w = (it.wire = mkWire(r)), dim = w.lastChild as HTMLElement
    const sx = a.x, sy = a.y
    await tween(clamp(140 + Math.hypot(r.w, r.h) * 0.26, 170, 480), (k) => {
      const e = ease(k)
      a.x = sx + (r.x + r.w - sx) * e
      a.y = sy + (r.y + r.h - sy) * e
      w.style.width = `${r.w * e}px`; w.style.height = `${r.h * e}px`
      dim.textContent = `${Math.round(r.w * e)} × ${Math.round(r.h * e)}`
    })
    a.mode('arrow')
  }

  // ---------- texte tapé : les lettres sont remises dans leurs nœuds d'origine à la fin ----------
  function splitChars(it: Item) {
    const walker = document.createTreeWalker(it.el, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) { const n = walker.currentNode as Text; if ((n.textContent ?? '').trim() !== '') nodes.push(n) }
    const all: HTMLElement[] = []
    it.split = nodes.map((orig) => {
      const frag = document.createDocumentFragment(), spans: HTMLElement[] = []
      for (const ch of orig.textContent ?? '') {
        const s = document.createElement('span'); s.className = 'bd-ch'; s.textContent = ch
        frag.appendChild(s); spans.push(s); all.push(s)
      }
      orig.parentNode?.replaceChild(frag, orig)
      return { orig, spans }
    })
    return all
  }
  function restoreChars(it: Item) {
    if (!it.split) return
    for (const { orig, spans } of it.split) {
      const first = spans[0]
      if (first?.parentNode) first.parentNode.insertBefore(orig, first)
      for (const s of spans) s.remove()
    }
    it.split = null
  }
  async function typeIn(it: Item, a: Agent) {
    const spans = splitChars(it), n = spans.length
    it.el.dataset.on = ''
    let shown = 0
    await tween(clamp(n * 13, 150, 900), (k) => {
      const upto = Math.round(k * n)
      if (upto <= shown) return
      for (let i = shown; i < upto; i++) spans[i].classList.add('v')
      shown = upto
      const r = spans[upto - 1].getBoundingClientRect()
      if (r.height) { a.x = r.right + scrollX + 2; a.y = r.top + r.height / 2 + scrollY }
    })
    for (const s of spans) s.classList.add('v')
    restoreChars(it)
  }

  function reveal(it: Item) {
    restoreChars(it)
    it.el.dataset.on = ''
    if (it.wire) { const w = it.wire; w.classList.add('out'); setTimeout(() => w.remove(), 200); it.wire = null }
    it.done = true
    it.finish()
  }

  async function resolveJob(a: Agent, it: Item) {
    if (it.parent) await it.parent.ready
    const r = rectOf(it.el)
    if (!nearViewport(r)) { reveal(it); return }
    const guard = setTimeout(() => reveal(it), 7000) // filet de sécurité : jamais d'élément resté caché
    try {
      if (it.kind === 'text') {
        await a.moveTo(r.x + 3, r.y + Math.min(r.h / 2, 14))
        a.mode('ibeam'); it.wire?.classList.add('edit')
        await typeIn(it, a)
      } else {
        await a.moveTo(r.x + r.w * rnd(0.25, 0.75), r.y + r.h * rnd(0.3, 0.7))
        a.click(); it.el.dataset.on = ''
        await wait(110)
      }
    } finally { clearTimeout(guard) }
    reveal(it)
  }

  // ---------- lot d'éléments arrivés ensemble à l'écran : tous les cadres, puis tout le contenu ----------
  async function build(batch: Item[]) {
    backlog += batch.length
    pace = clamp(basePace + backlog / 14, basePace, 3.6)
    const at = (it: Item) => { const r = rectOf(it.el); return { x: r.x, y: r.y } }
    const p1: Promise<void>[] = []
    for (const it of batch) { p1.push(dispatch((a) => wireJob(a, it), at(it))); await wait(34) }
    await Promise.all(p1)
    await wait(180)
    const p2: Promise<void>[] = []
    const settle = () => { backlog = Math.max(0, backlog - 1); pace = clamp(basePace + backlog / 14, basePace, 3.6) }
    for (const it of batch) {
      p2.push(dispatch((a) => resolveJob(a, it), at(it)).then(settle))
      await wait(46)
    }
    await Promise.all(p2)
  }

  function request(it: Item) {
    if (it.requested || it.done) return
    if (it.parent) request(it.parent)
    it.requested = true
    pending.add(it)
  }
  const fontsReady = (document.fonts?.ready ?? Promise.resolve()).catch(() => undefined)
  async function flush() {
    flushTimer = 0
    await fontsReady // les cadres se mesurent avec les vraies polices
    if (!alive || !pending.size) return
    const batch = [...pending].filter((it) => !it.done).sort((p, q) => { const a = rectOf(p.el), b = rectOf(q.el); return a.y - b.y || a.x - b.x })
    pending.clear()
    await build(batch)
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const it = itemOf.get(e.target)
      if (e.isIntersecting && it) request(it)
    }
    if (pending.size && !flushTimer) flushTimer = window.setTimeout(() => { void flush() }, 90)
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 })

  // ---------- démarrage ----------
  for (const c of root.querySelectorAll(':scope > *')) scan(c, null)
  html.dataset.build = ''
  // Les parents sont repérés avant les enfants (ordre du document) : l'observation suit la même logique.
  for (const it of items) io.observe(it.el)
  for (let i = 0; i < count; i++) { const a = makeAgent(i); agents.push(a); void live(a) }

  return {
    destroy() {
      alive = false
      io.disconnect()
      clearTimeout(flushTimer)
      if (raf) cancelAnimationFrame(raf)
      for (const it of items) { restoreChars(it); it.wire?.remove(); delete it.el.dataset.b; delete it.el.dataset.on }
      delete html.dataset.build
      stage.remove()
    },
  }
}
