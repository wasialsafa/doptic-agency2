import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
// [1] Import the CursorProvider
import { CursorProvider } from './context/CursorContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Remove StrictMode in production to improve performance
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          {/* [2] Wrap App with CursorProvider */}
          <CursorProvider>
            <App />
          </CursorProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>,
  )
} else {
  root.render(
    <ThemeProvider>
      <BrowserRouter>
        {/* [2] Wrap App with CursorProvider here as well */}
        <CursorProvider>
          <App />
        </CursorProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}