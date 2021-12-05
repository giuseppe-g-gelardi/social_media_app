import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { lightTheme, darkTheme } from './components/theme/Theme'
import MainAppbar from './components/MainAppbar'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Error from './pages/Error'

export default function App () {
  const [darkMode, setDarkMode] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const theme = darkMode ? darkTheme : lightTheme
  // const location = useLocation()

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    setIsAuth(token !== null)
  }

  useEffect(() => {
    checkAuth()
  }, [isAuth])

  // function RequireAuth(props) {
  //   const { children } = props
  //   const navigate = useNavigate()

  //   return isAuth ? children :
  // navigate('/')
  //     <Navigate
  //       to='/'
  //       // replace
  //       // state={{ path: location.pathname }}
  //     />
  // }

  const getUserFromToken = async () => {
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const userid = decodedToken._id

    if (token) {
      try {
        await axios
          .get(`http://localhost:8000/api/users/${userid}`, {
            headers: { 'x-auth-token': token }
          })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(`Axios error: `, error)
          })
      } catch (err) {
        console.log(err)
      }
    }
  }

  // useEffect(() => {
  //   getUserFromToken()
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MainAppbar
        check={darkMode}
        change={() => setDarkMode(!darkMode)}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      />
      <button onClick={() => console.log(isAuth)}>logger</button>
      <button onClick={() => getUserFromToken()}>getUserFromToken</button>

      <Routes>
        <Route path='/' element={<Landing />} />

        <Route
          path='/home'
          element={
            // <RequireAuth>
            <Home />
            // </RequireAuth>
          }
        />

        <Route path='*' element={<Error />} />
      </Routes>
    </ThemeProvider>
  )
}

// <Route path='/' element={<Landing />} />
// <Route path='/home' element={<Home />} />
// <Route path='*' element={<Error />} />

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
