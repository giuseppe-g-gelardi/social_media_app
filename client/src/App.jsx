import React, { useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

import { lightTheme, darkTheme } from './components/theme/Theme'
import MainAppbar from './components/MainAppbar'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Error from './pages/Error'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'

// import UserState from './context/UserState'
// import userContext from './context/userContext'

import { AuthContext } from './context/AuthContext'

export default function App () {
  const [darkMode, setDarkMode] = useState(false)
  const theme = darkMode ? darkTheme : lightTheme

  const { isAuth } = useContext(AuthContext)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MainAppbar check={darkMode} change={() => setDarkMode(!darkMode)} />
      <button onClick={() => console.log(isAuth)}>logger</button>
      <RegistrationPage />
      <LoginPage />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </ThemeProvider>
  )
}
