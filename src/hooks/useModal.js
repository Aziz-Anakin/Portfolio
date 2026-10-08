import { useEffect } from 'react'

// Comportement commun aux fenêtres modales : fermeture au clavier (Échap) et
// verrouillage du défilement de la page tant que la modale est ouverte.
export default function useModal(onClose, isOpen = true) {
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    // Le verrou se pose sur <html> : un `overflow:hidden` sur <body> en fait un
    // conteneur de défilement et casse le `sticky` de l'en-tête.
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    const prevPadding = root.style.paddingRight
    const scrollbar = window.innerWidth - root.clientWidth
    root.style.overflow = 'hidden'
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`

    return () => {
      document.removeEventListener('keydown', onKey)
      root.style.overflow = prevOverflow
      root.style.paddingRight = prevPadding
    }
  }, [onClose, isOpen])
}
