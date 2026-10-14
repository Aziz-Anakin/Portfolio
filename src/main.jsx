import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

console.log("%co7 — Salut dev ! Tape 30k sur le site, et recrute-moi avant la prochaine release de Star Citizen.", 'font: 14px monospace')

// Rien ne se copie ni ne se glisse hors du site (le CSS bloque déjà la sélection).
for (const type of ['copy', 'cut', 'dragstart']) {
  document.addEventListener(type, (e) => e.preventDefault())
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)