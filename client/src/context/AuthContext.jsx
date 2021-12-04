import React, { createContext, useContext, useState} from 'react'

const AuthContext = createContext({
  isAuth: false,
  login: () => {}
})

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = (props) => {
  const { children } = props
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem('token');
    return token !== null;
  });

  const login = () => setIsAuth(true)

  return (
    <AuthContext.Provider value={{ isAuth, login }}>
      {children}
    </AuthContext.Provider>
  )
}

// import React, { createContext, useEffect, useState } from 'react'

// const AuthContext = createContext()

// function AuthContextProvider(props) {
//   const { children } = props
//   const [isAuth, setIsAuth] = useState(false)

//   async function getAuth() {
//     const token = await localStorage.getItem('token')
//     if (token) setIsAuth(true)
//   }

//   useEffect(() => {
//     getAuth()
//   }, [])

//   return (
//     <AuthContext.Provider value={{ isAuth, setIsAuth }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export { AuthContext, AuthContextProvider }
