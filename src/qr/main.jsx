import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import QrPage from './QrPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QrPage />
  </StrictMode>,
)
