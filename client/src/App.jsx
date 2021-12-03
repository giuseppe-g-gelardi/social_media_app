import React, { useState, useContext, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

import { lightTheme, darkTheme } from './components/theme/Theme'
import MainAppbar from './components/MainAppbar'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Error from './pages/Error'
// import RegistrationPage from './pages/RegistrationPage'
// import LoginPage from './pages/LoginPage'

import { AuthContext } from './context/AuthContext'

export default function App () {
  const [darkMode, setDarkMode] = useState(false)
  const theme = darkMode ? darkTheme : lightTheme
  const { isAuth, setIsAuth } = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    return token ? setIsAuth(true) : setIsAuth(false)
  })

  const PrivateRoute = ({ children }) => {
  let location = useLocation()

    if (!isAuth) {
      return <Navigate to='/' state={{ from: location }} />
    }
    return children
  }
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MainAppbar check={darkMode} change={() => setDarkMode(!darkMode)} />
      <button onClick={() => console.log(isAuth)}>logger</button>
   
      <Routes>
        <Route 
          path='/home' 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </ThemeProvider>
  )
}
