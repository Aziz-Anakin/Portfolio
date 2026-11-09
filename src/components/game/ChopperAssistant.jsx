import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArrowUpRight, Send, X } from 'lucide-react'
import { PixelArt } from './OnePiece.jsx'
import { GREETING, MENU, answer } from '../../data/assistant.js'

// Chopper, l'assistant du portfolio, en boîte de dialogue de jeu de rôle : portrait, texte qui s'écrit lettre par
// lettre, menu de questions (curseur ▶) et champ libre. Il répond à partir des données du site (voir data/assistant.js),
// ce n'est pas un modèle d'IA. Fermé, seul le haut de son chapeau dépasse de la bande du bas.
// Accessibilité : bouton avec aria-expanded, panneau nommé, réponse annoncée en entier (aria-live) pendant que le
// texte visible s'écrit, Échap ferme et rend le focus au bouton, texte instantané avec `prefers-reduced-motion`.
const SPEED = 16 // ms par lettre

function ChopperAssistant() {
  const reduce = useReducedMotion()
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [reply, setReply] = useState(GREETING)
  const [shown, setShown] = useState(reduce ? GREETING.text.length : 0)
  const [draft, setDraft] = useState('')
  const [asked, setAsked] = useState(null)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)
  const logRef = useRef(null)
  const done = shown >= reply.text.length

  // Texte qui s'écrit.
  useEffect(() => {
    if (!open) return undefined
    if (reduce) {
      setShown(reply.text.length)
      return undefined
    }
    setShown(0)
    const id = setInterval(() => {
      setShown((n) => {
        if (n + 1 >= reply.text.length) clearInterval(id)
        return n + 1
      })
    }, SPEED)
    return () => clearInterval(id)
  }, [reply, open, reduce])

  // À l'ouverture : le focus va sur le panneau ; le texte repart du début.
  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  useEffect(() => {
    logRef.current?.scrollTo({ top: 0 })
  }, [reply])

  // Le bouton n'existe pas tant que le panneau est ouvert : le focus lui revient une fois qu'il est réapparu.
  const returnFocus = useRef(false)
  useEffect(() => {
    if (!open && returnFocus.current) {
      returnFocus.current = false
      buttonRef.current?.focus()
    }
  }, [open])

  const close = () => {
    returnFocus.current = true
    setOpen(false)
  }

  const ask = (text, label = text) => {
    const t = text.trim()
    if (!t) return
    setAsked(label)
    setReply(answer(t))
    setDraft('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      close()
    }
  }

  const bar = 'fixed right-3 z-[60] bottom-10 sm:bottom-11 md:bottom-12'
  const barStyle = { marginBottom: 'env(safe-area-inset-bottom)' }

  return (
    <>
      {/* Chopper caché : seul le haut de son chapeau dépasse de la bande du bas */}
      {!open && (
        <div className={bar} style={barStyle}>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => {
              setReply(GREETING)
              setAsked(null)
              setOpen(true)
            }}
            aria-expanded="false"
            aria-controls={panelId}
            aria-label="Ouvrir Chopper, l’assistant du portfolio"
            className={`block h-5 w-12 cursor-pointer overflow-hidden ${reduce ? '' : 'chopper-peek'}`}
          >
            <PixelArt kind="chopper" size={4} />
          </button>
        </div>
      )}

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="Chopper, assistant du portfolio"
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className={`${bar} flex max-h-[min(36rem,calc(100dvh-7rem))] w-[calc(100vw-1.5rem)] max-w-[24rem] flex-col border-2 border-white bg-ink text-white shadow-[6px_6px_0_rgba(0,0,0,0.45)] outline-none motion-safe:animate-zoom-in`}
          style={barStyle}
        >
          <header className="flex shrink-0 items-center gap-3 border-b-2 border-white bg-panel px-3 py-2">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-white bg-azure">
              <PixelArt kind="chopperFace" size={4} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-anton text-2xl uppercase leading-none tracking-wide">Chopper</span>
              <span className="block font-mono text-[11px] uppercase tracking-widest text-bright">Docteur de bord</span>
            </span>
            <button type="button" onClick={close} aria-label="Fermer Chopper" className="flex h-11 w-11 shrink-0 items-center justify-center border border-line transition-colors hover:border-pink hover:bg-azure">
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div ref={logRef} className="min-h-0 flex-auto overflow-y-auto overscroll-contain p-3">
            {asked && <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-bright">▶ {asked}</p>}
            {/* Texte complet pour les lecteurs d'écran, texte qui s'écrit pour les yeux */}
            <p className="sr-only" aria-live="polite">{reply.text}</p>
            <p aria-hidden="true" className="min-h-[4.5rem] border-2 border-white bg-panel p-3 text-[15px] leading-relaxed">
              {reply.text.slice(0, shown)}
              {!done && <span className="animate-blink">▌</span>}
              {done && <span className="ml-1 inline-block animate-blink text-pink">▼</span>}
            </p>
            {done && reply.links?.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2">
                {reply.links.map((l) => {
                  const external = l.href.startsWith('http') || l.href.endsWith('.pdf')
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        onClick={() => !external && !l.href.startsWith('mailto') && !l.href.startsWith('tel') && setOpen(false)}
                        className="inline-flex min-h-11 items-center gap-1 border border-azure bg-azure px-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:border-white hover:bg-white hover:text-azure"
                      >
                        {l.label} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}

            <p className="mb-1 mt-4 font-mono text-[11px] uppercase tracking-widest text-bright">Que veux-tu savoir ?</p>
            <ul className="grid gap-1">
              {MENU.map((m) => (
                <li key={m.q}>
                  <button type="button" onClick={() => ask(m.q, m.label)} className="group flex min-h-11 w-full items-center gap-2 border border-line px-3 text-left font-mono text-xs uppercase tracking-wider transition-colors hover:border-pink hover:bg-panel focus-visible:border-pink">
                    <span aria-hidden="true" className="w-3 text-pink opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">▶</span>
                    {m.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              ask(draft)
            }}
            className="flex shrink-0 gap-2 border-t-2 border-white bg-panel p-2"
          >
            <label htmlFor={`${panelId}-q`} className="sr-only">
              Ta question pour Chopper
            </label>
            <input
              id={`${panelId}-q`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Pose ta question…"
              maxLength={120}
              autoComplete="off"
              className="min-h-11 min-w-0 flex-1 border border-line bg-ink px-3 text-base text-white placeholder:text-white/60 focus:border-pink focus:outline-none"
            />
            <button type="submit" aria-label="Envoyer la question" className="flex h-11 w-11 shrink-0 items-center justify-center border border-azure bg-azure transition-colors hover:border-white hover:bg-white hover:text-azure">
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChopperAssistant
