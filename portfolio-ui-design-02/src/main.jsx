/**
 * Application entry point - mounts the React app to the DOM.
 * StrictMode helps identify potential problems (e.g., deprecated APIs) during development.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot enables React 18+ concurrent features; replaces legacy ReactDOM.render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
