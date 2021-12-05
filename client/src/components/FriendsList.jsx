import React from 'react'

export default function FriendsList(props) {
  const { user } = props
  return (
    <div>
      <h1>display friends list</h1>
      <button onClick={() => console.log(user.friendsList)}>log friends</button>
    </div>
  )
}
