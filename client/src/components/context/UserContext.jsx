// TODO ill figure this out one day... unfortunately, not today.

import { useState, createContext, useContext } from "react";

const UserContext = createContext(null)

export const UserProvider = ({ user, children }) => {
  const [ currentUser, setCurrentUser ] = useState(user)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

// import { useState, useContext, useEffect, createContext } from 'react'
// import axios from 'axios'
// import jwtDecode from 'jwt-decode'

// const UserContext = createContext()

// export function useUser () {
//   return useContext(UserContext)
// }

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null)

//   const token = localStorage.getItem('token')

//   useEffect(() => {
//     if (token) {
//       const userid = jwtDecode(localStorage.getItem('token'))._id
//       axios
//         .get(`http://localhost:8000/api/users/${userid}`, {
//           headers: { 'x-auth-token': token }
//         })
//         .then(response => {
//           setUser(response.data)
//           console.log(user)
//         })
//         .catch(error => {
//           console.log(`Axios error: `, error)
//         })
//     } else {
//       setUser(null)
//       console.log('no user')
//     }
//     return () => {}
//   }, [])

//   return <UserContext.Provider value={user}>{children}</UserContext.Provider>
// }


