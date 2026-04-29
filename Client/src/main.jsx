import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <AuthProvider>
        <ToastContainer position="bottom-right" theme="colored" />
        <App />
    </AuthProvider>
   </BrowserRouter>
 
)
