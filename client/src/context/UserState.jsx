import React, { useState } from 'react'
import UserContext from './userContext'

export default function UserState(props) {

  const { children } = props

  const [isAuth, setIsAuth] = useState(false)

  return (
    <UserContext.Provider 
      value={{
        isAuth,
        setIsAuth,
        message: "this is a message from context"

      }}
    >
      {children}
    </UserContext.Provider>
  )
}
