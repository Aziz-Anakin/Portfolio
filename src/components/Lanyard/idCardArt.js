// Dessin de la carte d'identité « développeur » (recto / verso) et du cordon,
// dans le repère logique CARD_W × CARD_H du composant Lanyard.
import QRCode from 'qrcode'
import { CARD_W, CARD_H } from './cardSize.js'

const ANTON = '"Anton", sans-serif'
const MONO = '"JetBrains Mono", "Space Mono", monospace'

const C = {
  ink: '#0f172a',
  muted: '#475569',
  blue: '#1d4ed8',
  navy: '#1e3a8a',
  red: '#dc2626',
  pill: '#2563eb',
}

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

// Réduit la taille de police jusqu'à ce que le texte tienne dans maxW.
function fitText(ctx, text, maxW, size, family, weight = '') {
  let s = size
  do {
    ctx.font = `${weight} ${s}px ${family}`.trim()
    if (ctx.measureText(text).width <= maxW) break
    s -= 2
  } while (s > 10)
  return s
}

function background(ctx) {
  const g = ctx.createLinearGradient(0, 0, CARD_W, CARD_H)
  g.addColorStop(0, '#dbeafe')
  g.addColorStop(0.5, '#f8fafc')
  g.addColorStop(1, '#ffe4e6')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, CARD_W, CARD_H)

  // Guilloches
  ctx.lineWidth = 2
  for (let r = 40; r < 900; r += 26) {
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.07)'
    ctx.beginPath()
    ctx.arc(CARD_W * 0.85, CARD_H * 0.62, r, 0, Math.PI * 2)
    ctx.stroke()
  }
  for (let r = 60; r < 700; r += 34) {
    ctx.strokeStyle = 'rgba(225, 29, 72, 0.06)'
    ctx.beginPath()
    ctx.arc(0, CARD_H, r, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Bande tricolore en bas
  const bw = CARD_W / 3
  ;[C.navy, '#ffffff', C.red].forEach((color, i) => {
    ctx.fillStyle = color
    ctx.fillRect(i * bw, CARD_H - 26, bw + 1, 26)
  })
}

function label(ctx, text, x, y) {
  ctx.fillStyle = C.muted
  ctx.font = `700 30px ${MONO}`
  ctx.fillText(text.toUpperCase(), x, y)
}

function value(ctx, text, x, y, maxW, size = 64) {
  ctx.fillStyle = C.ink
  fitText(ctx, text, maxW, size, ANTON)
  ctx.fillText(text.toUpperCase(), x, y)
}

// Bouton « lien » : pastille bleue avec pictogramme et texte blanc.
function pill(ctx, { x, y, w, h }, icon, text) {
  ctx.save()
  ctx.shadowColor = 'rgba(30, 64, 175, 0.35)'
  ctx.shadowBlur = 24
  ctx.shadowOffsetY = 8
  ctx.fillStyle = C.pill
  roundRect(ctx, x, y, w, h, h / 2)
  ctx.fill()
  ctx.restore()

  ctx.fillStyle = '#ffffff'
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${Math.round(h * 0.5)}px ${MONO}`
  ctx.fillText(icon, x + h * 0.42, y + h / 2 + 2)
  fitText(ctx, text, w - h * 1.5, Math.round(h * 0.4), MONO, '700')
  ctx.fillText(text, x + h * 1.15, y + h / 2 + 2)
  ctx.textBaseline = 'alphabetic'
}

const toZone = (id, r) => ({ id, x: r.x / CARD_W, y: r.y / CARD_H, w: r.w / CARD_W, h: r.h / CARD_H })

export async function createCardArt({ photoSrc, portfolioUrl }) {
  await Promise.all([
    document.fonts.load(`64px ${ANTON}`),
    document.fonts.load(`700 40px "JetBrains Mono"`),
  ]).catch(() => {})

  const [photo, qr] = await Promise.all([
    loadImage(photoSrc),
    QRCode.toDataURL(portfolioUrl, { margin: 0, width: 600, color: { dark: '#0f172a', light: '#ffffff' } }).then(loadImage),
  ])

  // ── Recto ──
  const frontLinks = {
    email: { x: 70, y: 1070, w: 860, h: 120 },
    phone: { x: 70, y: 1220, w: 860, h: 120 },
  }

  const drawFront = (ctx) => {
    background(ctx)

    // En-tête (laisse la place à l'attache en haut)
    ctx.fillStyle = C.blue
    ctx.font = `92px ${ANTON}`
    ctx.fillText("CARTE D'IDENTITÉ", 70, 230)
    ctx.fillStyle = C.muted
    ctx.font = `700 32px ${MONO}`
    ctx.fillText('DÉVELOPPEUR · DEVELOPER ID', 72, 285)
    ctx.fillStyle = C.navy
    roundRect(ctx, 820, 160, 110, 80, 16)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = `56px ${ANTON}`
    ctx.fillText('FR', 846, 222)

    // Photo (recadrée par le haut)
    const px = 70
    const py = 340
    const pw = 400
    const ph = 520
    ctx.save()
    roundRect(ctx, px, py, pw, ph, 28)
    ctx.clip()
    const scale = Math.max(pw / photo.width, ph / photo.height)
    ctx.filter = 'grayscale(25%)'
    ctx.drawImage(photo, px + (pw - photo.width * scale) / 2, py, photo.width * scale, photo.height * scale)
    ctx.restore()
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.15)'
    ctx.lineWidth = 3
    roundRect(ctx, px, py, pw, ph, 28)
    ctx.stroke()

    // Puce
    const cx = 520
    const cy = 350
    const chip = ctx.createLinearGradient(cx, cy, cx + 150, cy + 110)
    chip.addColorStop(0, '#fde68a')
    chip.addColorStop(1, '#f59e0b')
    ctx.fillStyle = chip
    roundRect(ctx, cx, cy, 150, 110, 18)
    ctx.fill()
    ctx.strokeStyle = 'rgba(146, 64, 14, 0.45)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(cx + 50, cy)
    ctx.lineTo(cx + 50, cy + 110)
    ctx.moveTo(cx + 100, cy)
    ctx.lineTo(cx + 100, cy + 110)
    ctx.moveTo(cx, cy + 55)
    ctx.lineTo(cx + 150, cy + 55)
    ctx.stroke()

    label(ctx, 'Nom', 520, 540)
    value(ctx, 'Mdoughy', 520, 612, 410, 76)
    label(ctx, 'Prénom', 520, 680)
    value(ctx, 'Yanis', 520, 752, 410, 76)
    label(ctx, 'Lieu', 520, 820)
    value(ctx, 'Paris 18e', 520, 872, 410, 50)

    label(ctx, 'Poste', 70, 930)
    value(ctx, 'Développeur Web · Full Stack', 70, 1000, 560, 60)
    label(ctx, 'École', 660, 930)
    value(ctx, 'Epitech Paris', 660, 1000, 270, 60)

    pill(ctx, frontLinks.email, '@', 'Yanis.mdoughy@outlook.fr')
    pill(ctx, frontLinks.phone, '☎', '06 62 67 91 22')

    ctx.fillStyle = C.navy
    ctx.font = `italic 600 58px Georgia, serif`
    ctx.fillText('Y. Mdoughy', 70, 1430)
    ctx.fillStyle = C.muted
    ctx.font = `700 26px ${MONO}`
    ctx.textAlign = 'right'
    ctx.fillText('ATTRAPE · RETOURNE · CLIQUE', 930, 1428)
    ctx.textAlign = 'left'
  }

  // ── Verso ──
  const backLinks = {
    linkedin: { x: 70, y: 250, w: 860, h: 120 },
    github: { x: 70, y: 400, w: 860, h: 120 },
    cv: { x: 70, y: 550, w: 860, h: 120 },
  }

  const drawBack = (ctx) => {
    background(ctx)

    ctx.fillStyle = C.blue
    ctx.font = `80px ${ANTON}`
    ctx.fillText('LIENS & CONTACT', 70, 200)

    pill(ctx, backLinks.linkedin, 'in', 'LinkedIn · Yanis Mdoughy')
    pill(ctx, backLinks.github, '</>', 'GitHub · Aziz-Anakin')
    pill(ctx, backLinks.cv, 'CV', 'Consulter mon CV')

    // QR code vers le portfolio
    ctx.fillStyle = '#ffffff'
    roundRect(ctx, 70, 720, 330, 330, 24)
    ctx.fill()
    ctx.drawImage(qr, 95, 745, 280, 280)

    label(ctx, 'Disponible', 450, 770)
    value(ctx, 'Avril – Juillet 2027', 450, 840, 480, 56)
    label(ctx, 'Recherche', 450, 910)
    value(ctx, 'Stage 4 mois', 450, 980, 480, 56)
    ctx.fillStyle = C.muted
    ctx.font = `700 26px ${MONO}`
    ctx.fillText('SCANNE → PORTFOLIO', 450, 1040)

    // Bande de lecture façon MRZ
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
    roundRect(ctx, 50, 1110, 900, 300, 20)
    ctx.fill()
    ctx.fillStyle = C.ink
    ctx.font = `700 46px ${MONO}`
    ;['IDFRAMDOUGHY<<YANIS<<<<<<', 'DEV<WEB<FULL<STACK<<<<<<', 'EPITECH<<PARIS<<2027<<<<<'].forEach((line, i) => {
      fitText(ctx, line, 850, 46, MONO, '700')
      ctx.fillText(line, 75, 1190 + i * 80)
    })
  }

  const zones = {
    front: Object.entries(frontLinks).map(([id, r]) => toZone(id, r)),
    back: Object.entries(backLinks).map(([id, r]) => toZone(id, r)),
  }

  return { drawFront, drawBack, zones }
}

// Texture du cordon : bleu nuit avec le nom en blanc.
export function createBandImage() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, 0, 256)
  g.addColorStop(0, '#1e3a8a')
  g.addColorStop(1, '#1d4ed8')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 1024, 256)
  ctx.fillStyle = '#ffffff'
  ctx.font = `120px ${ANTON}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('YANIS MDOUGHY', 512, 134)
  return canvas.toDataURL('image/png')
}
