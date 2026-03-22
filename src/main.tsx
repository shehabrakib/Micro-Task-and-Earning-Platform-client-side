import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element with id "root" was not found.')
}

createRoot(rootElement).render(
  <StrictMode>
    {/* BrowserRouter makes all page navigation work on the frontend. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
