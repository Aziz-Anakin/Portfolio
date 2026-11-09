// Contrôle du site dans un vrai navigateur (Edge installé sur la machine, piloté par Playwright).
//
// Le portfolio est une suite de slides plein écran. Pour chaque taille d'écran :
//   - erreurs console, exceptions, requêtes en échec, images cassées
//   - une capture par slide, en avançant comme un visiteur (clavier, molette ou doigt)
//   - contenu qui dépasse de l'écran, cibles tactiles trop petites
//   - les interactions : menu, fenêtre CV, étude de cas, captures
//
//   npm run dev            (dans un autre terminal)
//   npm run check          → captures dans le dossier temporaire affiché à la fin
//   npm run check -- --only desktop,mobile --url http://localhost:4173/Portfolio/ --out ./captures
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const args = process.argv.slice(2)
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? fallback : args[i + 1]
}
const url = arg('url', 'http://localhost:5173/Portfolio/')
const out = resolve(arg('out', join(tmpdir(), 'portfolio-check')))
const only = arg('only', '')

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  // Grand écran large et bas (fenêtre de navigateur avec ses barres).
  { name: 'large', width: 1890, height: 842 },
  { name: 'laptop', width: 1280, height: 720 },
  { name: 'tablet', width: 820, height: 1180, hasTouch: true },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
].filter((v) => !only || only.split(',').includes(v.name))

mkdirSync(out, { recursive: true })

const browser = await chromium.launch({
  channel: 'msedge',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
})

let problems = 0
let current = ''
const report = (kind, detail) => {
  problems++
  console.log(`  ✗ [${current}] ${kind} : ${detail}`)
}
const expect = (label, condition, detail = '') => (condition ? console.log(`  ✓ ${label}`) : report(label, detail || 'échec'))

const slideId = (page) => page.evaluate(() => document.querySelector('main section')?.id)
// Temps d'une transition de slide, délai anti-rebond compris.
const SETTLE = 1150

// ── Une capture par slide, en avançant à la flèche du bas ────────────────────
async function slides(page, vp) {
  const seen = []
  for (let n = 1; n <= 20; n++) {
    const id = await slideId(page)
    if (seen.includes(id)) break
    seen.push(id)
    await page.waitForTimeout(900)
    await page.screenshot({ path: join(out, `${vp.name}-${String(n).padStart(2, '0')}-${id}.png`) })

    // Le contenu de la slide tient-il dans l'écran ? Sinon elle défile, ce qui reste acceptable
    // sur petit écran mais doit rester l'exception.
    const fit = await page.evaluate(() => {
      const s = document.querySelector('main section')
      return { extra: s.scrollHeight - s.clientHeight, wide: s.scrollWidth - s.clientWidth }
    })
    if (fit.extra > 4) console.log(`    · ${id} dépasse de ${fit.extra}px (la slide défile)`)
    if (fit.wide > 2) report(`débordement horizontal (${id})`, `${fit.wide}px`)

    const broken = await page.$$eval('main img', (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc.slice(0, 90)))
    for (const src of broken) report(`image cassée (${id})`, src)

    if (vp.isMobile) {
      const small = await page.$$eval('main a, main button, header a, header button', (els) =>
        els
          .map((e) => ({ r: e.getBoundingClientRect(), label: (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 30) }))
          .filter(({ r }) => r.width > 0 && r.height > 0 && (r.width < 36 || r.height < 36))
          .map(({ r, label }) => `${label || '?'} (${Math.round(r.width)}×${Math.round(r.height)})`)
          .slice(0, 5),
      )
      for (const s of small) report(`cible tactile petite (${id})`, s)
    }

    // Slide suivante : on descend jusqu'au bas de la slide si elle défile, puis flèche du bas.
    await page.evaluate(() => {
      const s = document.querySelector('main section')
      s.scrollTop = s.scrollHeight
    })
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(SETTLE)
  }
  expect(`${seen.length} slides parcourues au clavier`, seen.length >= 8, seen.join(', '))
  return seen
}

// ── Interactions ─────────────────────────────────────────────────────────────
async function interactions(page, vp, ids) {
  const dialog = (name) => page.getByRole('dialog', { name })
  const tap = (locator) => (vp.hasTouch ? locator.tap() : locator.click())
  const last = ids[ids.length - 1]

  // Retour au début, puis molette (ou glissement du doigt) pour avancer d'une slide.
  await page.keyboard.press('Home')
  await page.waitForTimeout(SETTLE)
  expect('touche Début → première slide', (await slideId(page)) === ids[0])

  if (vp.hasTouch) {
    const cdp = await page.context().newCDPSession(page)
    const x = Math.round(vp.width / 2)
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: Math.round(vp.height * 0.7) }] })
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: Math.round(vp.height * 0.4) }] })
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await page.waitForTimeout(SETTLE)
    expect('glissement vers le haut → slide suivante', (await slideId(page)) === ids[1], `slide : ${await slideId(page)}`)
  } else {
    await page.mouse.move(vp.width / 2, vp.height / 2)
    await page.mouse.wheel(0, 120)
    await page.waitForTimeout(SETTLE)
    expect('molette → slide suivante', (await slideId(page)) === ids[1], `slide : ${await slideId(page)}`)
    // Une rafale de molette (inertie de trackpad) ne doit avancer que d'une slide.
    for (let i = 0; i < 6; i++) await page.mouse.wheel(0, 120)
    await page.waitForTimeout(SETTLE)
    expect('rafale de molette → une seule slide', (await slideId(page)) === ids[2], `slide : ${await slideId(page)}`)
  }

  // Menu.
  const burger = page.getByRole('button', { name: 'Ouvrir le menu' })
  if (await burger.isVisible()) {
    await tap(burger)
    await page.waitForTimeout(700)
    expect('menu mobile ouvert', await dialog('Menu').isVisible())
    await page.screenshot({ path: join(out, `${vp.name}-90-menu.png`) })
    await tap(dialog('Menu').getByRole('link', { name: 'Contact' }))
  } else {
    await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Contact' }).click()
  }
  await page.waitForTimeout(SETTLE)
  expect('menu → Contact', (await slideId(page)) === last, `slide : ${await slideId(page)}`)
  expect('menu refermé', !(await dialog('Menu').isVisible()))

  // Fenêtre CV depuis l'accueil ; la navigation entre slides est suspendue derrière.
  await page.keyboard.press('Home')
  await page.waitForTimeout(SETTLE)
  await tap(page.locator('main').getByRole('button', { name: 'Mon CV' }))
  await page.waitForTimeout(900)
  expect('fenêtre CV ouverte', await dialog(/CV/).isVisible())
  await page.screenshot({ path: join(out, `${vp.name}-91-cv.png`) })
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(500)
  expect('slides figées derrière la fenêtre', (await slideId(page)) === ids[0])
  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)
  expect('fenêtre CV fermée par Échap', !(await dialog(/CV/).isVisible()))

  // Projets : le lien de l'accueil y mène, « Ouvrir le projet » affiche l'étude de cas.
  await tap(page.locator('main').getByRole('link', { name: /Voir mes projets/ }))
  await page.waitForTimeout(SETTLE + 600)
  expect('accueil → Projets', (await slideId(page)) === 'projects', `slide : ${await slideId(page)}`)
  // À la souris : bouton du projet survolé. Au doigt : on touche une tuile du mur.
  const openButton = page.locator('main').getByRole('button', { name: /Ouvrir le projet/ })
  if (await openButton.count()) await tap(openButton)
  else await page.getByRole('group', { name: 'Mur de projets' }).getByRole('button').first().dispatchEvent('click')
  await page.waitForTimeout(900)
  expect('étude de cas ouverte', await dialog(/Projet/).isVisible())
  await page.screenshot({ path: join(out, `${vp.name}-92-projet.png`) })
  await tap(dialog(/Projet/).getByRole('button', { name: 'Projet suivant' }))
  await page.waitForTimeout(700)
  await page.screenshot({ path: join(out, `${vp.name}-93-projet-suivant.png`) })
  const shot = dialog(/Projet/).getByRole('button', { name: /Agrandir la capture/ })
  if (await shot.count()) {
    await tap(shot.first())
    await page.waitForTimeout(800)
    expect('visionneuse de captures ouverte', await dialog(/Aperçu/).isVisible())
    await page.screenshot({ path: join(out, `${vp.name}-94-captures.png`) })
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)
    expect('Échap ferme la visionneuse, pas l’étude de cas', (await dialog(/Projet/).isVisible()) && !(await dialog(/Aperçu/).isVisible()))
  }
  await page.keyboard.press('Escape')
  await page.waitForTimeout(600)
  expect('étude de cas fermée par Échap', !(await dialog(/Projet/).isVisible()))

  // Clavier : le focus doit toujours se voir.
  if (!vp.hasTouch) {
    await page.keyboard.press('Home')
    await page.waitForTimeout(SETTLE)
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const focus = await page.evaluate(() => {
      const s = getComputedStyle(document.activeElement)
      return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0
    })
    expect('focus clavier visible', focus)
  }
}

for (const vp of VIEWPORTS) {
  current = vp.name
  console.log(`\n${vp.name} (${vp.width}×${vp.height})`)
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor ?? 1,
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.hasTouch ?? false,
  })
  const page = await context.newPage()
  page.on('console', (m) => { if (m.type() === 'error') report('console', m.text().slice(0, 200)) })
  page.on('pageerror', (e) => report('exception', e.message.slice(0, 200)))
  // Une image annulée parce qu'on a quitté sa slide avant la fin du chargement n'est pas une erreur.
  page.on('requestfailed', (r) => {
    if (r.failure()?.errorText !== 'net::ERR_ABORTED') report('requête', `${r.url().slice(0, 120)} (${r.failure()?.errorText})`)
  })
  page.on('response', (r) => { if (r.status() >= 400) report(`HTTP ${r.status()}`, r.url().slice(0, 120)) })

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  try {
    const ids = await slides(page, vp)
    await interactions(page, vp, ids)
  } catch (e) {
    report('test interrompu', e.message.split('\n')[0].slice(0, 200))
  }
  await context.close()
}

await browser.close()
console.log(`\nCaptures : ${out}`)
console.log(problems ? `${problems} problème(s) relevé(s).` : 'Aucun problème relevé.')
process.exit(problems ? 1 : 0)
