import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

export default function FriendsList() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>display friends list</h1>
      <button onClick={() => console.log(user.friendsList)}>log friends</button>
    </div>
  )
}
