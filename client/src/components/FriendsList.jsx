import React, { useContext, useEffect } from 'react'
import axios from 'axios'

import UserContext from '../context/UserContext'

export default function FriendsList() {
  const { user } = useContext(UserContext)
  let friendsArray = []

  const getFriendsList = () => {
    user.friendsList?.map(async friends => {
      let response = await axios.get(`http://localhost:8000/api/users/${friends}`)
      if (response.data) friendsArray.push(response.data)
    })
    return friendsArray
  }

  useEffect(() => {
    getFriendsList()
  })

  return (
    <div>
      <h1>display friends list</h1>
      <button onClick={() => console.log(user)}>log user</button>
      <button onClick={() => console.log(friendsArray)}>log friends list</button>
    </div>
  )
}
