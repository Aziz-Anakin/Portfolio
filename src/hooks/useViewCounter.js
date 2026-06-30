import { useEffect, useRef, useState } from 'react'

// Compteur de vues sans backend : on s'appuie sur le service gratuit
// abacus.jasoncameron.dev (aucune inscription, aucune clé).
//   - `/hit/<namespace>/<key>` : incrémente ET renvoie { value }
//   - `/get/<namespace>/<key>` : lit le total SANS incrémenter
// Le namespace doit être unique pour éviter les collisions avec d'autres sites.
const BASE = 'https://abacus.jasoncameron.dev'
const NS = 'yanis-mdoughy-portfolio'
const KEY = 'views'
// Drapeau local : une fois posé, ce navigateur ne sera plus jamais recompté.
const SEEN_KEY = 'portfolio-counted'

export default function useViewCounter() {
  const [views, setViews] = useState(null)
  // Garde anti-double-comptage : <StrictMode> monte deux fois en dev.
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    // Première visite de cet appareil → on incrémente (/hit).
    // Sinon → on se contente de lire le total (/get).
    let firstVisit = false
    try {
      firstVisit = !localStorage.getItem(SEEN_KEY)
    } catch {
      // localStorage indisponible (mode privé strict) : on lira sans compter.
    }

    const url = firstVisit
      ? `${BASE}/hit/${NS}/${KEY}`
      : `${BASE}/get/${NS}/${KEY}`

    let cancelled = false
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || typeof data?.value !== 'number') return
        setViews(data.value)
        // On ne pose le drapeau qu'après un incrément réussi.
        if (firstVisit) {
          try {
            localStorage.setItem(SEEN_KEY, '1')
          } catch {
            // Tant pis : au pire ce navigateur recomptera une fois.
          }
        }
      })
      .catch(() => {
        // Service indisponible : on n'affiche simplement rien.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return views
}
