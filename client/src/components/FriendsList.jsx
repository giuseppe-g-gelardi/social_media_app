import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import UserContext from '../context/UserContext'

export default function FriendsList() {
  const { user } = useContext(UserContext)
  // const [friendsList, setFriendsList] = useState({})
  let friendsList = []

  const getFriendsList = () => {
    user.friendsList?.map(async friends => {
      let response = await axios.get(`http://localhost:8000/api/users/${friends}`)
      console.log(response.data)
      if (response.data) friendsList.push(response.data)
    })
    return friendsList
  }

  useEffect(() => {
    getFriendsList()
  })

  return (
    <div>
      <h1>display friends list</h1>
      <button onClick={() => console.log(user.friendsList)}>log friends</button>
      <button onClick={() => console.log(getFriendsList())}>log friends list</button>
    </div>
  )
}
