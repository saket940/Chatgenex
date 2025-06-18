import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
const pathname = window.location.pathname;
const id = "index"+pathname.length < 25 ? "index67de4c32c1c7ae48eee336f0" : "index"+pathname.slice(1);
if(localStorage.getItem(id) ==undefined){

  localStorage.setItem(id,"0")
}