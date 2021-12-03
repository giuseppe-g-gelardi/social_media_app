import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
// import { AuthProvider } from './context/AuthContext'

ReactDOM.render(
  // <AuthProvider>
    <Router>
      <App />
    </Router>
  //</AuthProvider>
  ,
  document.getElementById('root')
)
