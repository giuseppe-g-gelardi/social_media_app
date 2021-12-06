import { useContext } from 'react'

import UserContext from '../context/UserContext'


export default function Profile() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Profile page</h1>
    </div>
  )
}

