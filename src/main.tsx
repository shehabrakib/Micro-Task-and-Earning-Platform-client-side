import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MockDataProvider } from './context/MockDataContext'
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
      {/* MockDataProvider stores mutable mock collections for dashboard pages. */}
      <MockDataProvider>
        {/* BrowserRouter makes all page navigation work on the frontend. */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MockDataProvider>
    </AuthProvider>
  </StrictMode>,
)
