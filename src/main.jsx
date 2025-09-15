import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AdminProvider } from './contexts/AdminContext'
import DataProvider from './providers/DataProvider'
import store from './store'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DataProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </DataProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
