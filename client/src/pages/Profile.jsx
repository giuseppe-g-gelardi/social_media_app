import { useContext } from 'react'

import UserContext from '../context/UserContext'


export default function Profile() {
  const { user } = useContext(UserContext)

  const username = user.name

  return (
    <div>
      <h1>Profile page</h1>
        welcome {username}
    </div>
  )
}
