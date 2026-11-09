import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import QrPage from './QrPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QrPage />
  </StrictMode>,
)
