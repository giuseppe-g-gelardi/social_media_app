import { useContext } from 'react'

import UserContext from '../context/UserContext'


export default function Profile() {
  const { user } = useContext(UserContext)

  const username = user.firstName

  return (
    <div>
      <h1>{username}'s profile!</h1>
        Welcome back {username}
    </div>
  )
}

