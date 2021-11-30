import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';

import { lightTheme, darkTheme } from './components/theme/Theme'
import Home from './pages/Home'
import MainAppbar from './components/MainAppbar';


export default function App() {

  const [darkMode, setDarkMode] = useState(false)
  const theme = (darkMode ? darkTheme : lightTheme)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <MainAppbar check={darkMode} change={() => setDarkMode(!darkMode)} />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
    </ThemeProvider>
  )
}
