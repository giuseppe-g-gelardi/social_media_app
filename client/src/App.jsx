import React, { useState } from 'react'
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

import UserState from './context/UserState'

export default function App () {
  const [darkMode, setDarkMode] = useState(false)
  const theme = darkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <UserState>
        <MainAppbar check={darkMode} change={() => setDarkMode(!darkMode)} />

        <RegistrationPage />
        <LoginPage />
        
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </UserState>
    </ThemeProvider>
  )
}
