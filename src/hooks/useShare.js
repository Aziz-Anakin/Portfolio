import { useState } from 'react'

// Logique de partage réutilisable : API Web Share (mobile) avec repli sur
// copie du lien dans le presse-papiers (desktop). `copied` permet d'afficher
// un retour visuel transitoire.
export default function useShare() {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareData = {
      title: 'Portfolio — Yanis Mdoughy',
      text: 'Découvre le portfolio de Yanis Mdoughy',
      url,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // Partage annulé ou indisponible → on bascule sur la copie.
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard indisponible : rien de plus à faire.
    }
  }

  return { copied, share }
}
