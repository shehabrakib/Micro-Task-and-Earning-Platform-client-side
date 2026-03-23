import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element with id "root" was not found.')
}

createRoot(rootElement).render(
  <StrictMode>
    {/* AuthProvider wraps the full app so every page can access auth state. */}
    <AuthProvider>
      {/* BrowserRouter makes all page navigation work on the frontend. */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
