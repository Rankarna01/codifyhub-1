import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MiniStudioHero from '../components/mini-studio/MiniStudioHero'

createRoot(document.getElementById('root')!).render(
  <StrictMode><MiniStudioHero portfolioHref="https://codifyhub.id/#portofolio" /></StrictMode>,
)
