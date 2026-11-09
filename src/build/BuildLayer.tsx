import { useLayoutEffect } from 'react'
import { startBuild } from './engine.ts'

// Lance « le site se construit » sur le contenu de <main> (voir engine.ts), seulement sur ordinateur : pas sur
// téléphone ni sur tablette (largeur sous 1024 px, ou écran sans survol), où la page s'affiche directement finie.
// Même chose avec `prefers-reduced-motion` ou `?static` dans l'adresse (pratique pour les captures).
const DESKTOP = '(min-width: 1024px) and (hover: hover)'

function BuildLayer() {
  useLayoutEffect(() => {
    const root = document.querySelector('main')
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('static')) return undefined
    const mq = window.matchMedia(DESKTOP)
    let engine = mq.matches ? startBuild(root) : null
    // Si la fenêtre change de taille au point de passer la limite : on arrête (tout s'affiche) ou on démarre.
    const onChange = () => {
      if (mq.matches && !engine) engine = startBuild(root)
      else if (!mq.matches && engine) { engine.destroy(); engine = null }
    }
    mq.addEventListener('change', onChange)
    return () => { mq.removeEventListener('change', onChange); engine?.destroy() }
  }, [])
  return null
}

export default BuildLayer
