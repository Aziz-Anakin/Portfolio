import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

console.log("%co7 — Salut dev ! Tape 30k sur le site, et recrute-moi avant la prochaine release de Star Citizen.", 'font: 14px monospace')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)