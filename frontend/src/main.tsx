import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import {createTheme, ThemeProvider} from '@mui/material'
import { AuthProvider } from './context/Authcontext.tsx'
import axios from "axios"
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const Theme = createTheme(
  {
    typography:{
      fontFamily: "Roboto slab, serif",
      allVariants: {color: 'white'},
    }
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider theme={Theme}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
