import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
// import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
// import axios from 'axios'
// import jwtDecode from 'jwt-decode'

import { lightTheme, darkTheme } from './components/theme/Theme'
import MainAppbar from './components/MainAppbar'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Error from './pages/Error'

import { UserProvider } from './context/UserContext'

export default function App () {

  const [darkMode, setDarkMode] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const theme = darkMode ? darkTheme : lightTheme

  const navigate = useNavigate()

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    setIsAuth(token !== null)
    return isAuth ? navigate('/home') : navigate('/')
  }

  useEffect(() => {
    checkAuth()
  }, [isAuth])

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <MainAppbar
          check={darkMode}
          change={() => setDarkMode(!darkMode)}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </ThemeProvider>
    </UserProvider>
  )
}



// {!isAuth && (
//   <>
//     <Route path='/' element={<Landing />} />
//   </>
// )}
// {isAuth && (
//   <>
//     <Route path='/home' element={<Home />} />
//   </>
// )}

// {/* <Route
// path='/home'
// element={
//   <RequireAuth>
//     <Home />
//   </RequireAuth>
// }
// /> */}

  // function RequireAuth() {
  //   return isAuth ? children : <Navigate to='/' />
  // }


    // useEffect(() => {
  //   getUserFromToken()
  // }, [])

  // const getUserFromToken = () => {
  //   const token = localStorage.getItem('token')

  //   if (token) {
  //     try {
  //       const userid = jwtDecode(localStorage.getItem('token'))._id
 
  //       axios
  //         .get(`http://localhost:8000/api/users/${userid}`, {
  //           headers: { 'x-auth-token': token }
  //         })
  //         .then(response => {
  //           console.log(response.data)
  //           setUser(response.data)
  //         })
  //         .catch(error => {
  //           console.log(`Axios error: `, error)
  //         })
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   } else {
  //     return;
  //   }
  // }
