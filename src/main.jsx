import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AdminProvider } from './contexts/AdminContext'
import DataProvider from './providers/DataProvider'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>,
)
