import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './styles/fonts.css'
import './styles/global.css'
import App from './App.tsx'

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
