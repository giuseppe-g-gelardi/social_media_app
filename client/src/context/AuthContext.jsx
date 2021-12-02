import { createContext, useContext, useState  } from "react";

export const AuthContext = createContext()

export const AuthProvider = (props) => {

  const [isAuth, setIsAuth] = useState(false)

  const { children } = props
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth
      }}
    >
      {children }
    </AuthContext.Provider>
  )
}

export const AuthConsumer = () => {
  return useContext(AuthContext)
}
