import React, { useContext } from 'react'
import { Container } from '@material-ui/core'
import FriendsList from '../components/FriendsList'
import SearchForFriends from '../components/SearchForFriends'

import UserContext from '../context/UserContext'

export default function Home() {
  const { user } = useContext(UserContext)
  
  return (
    <Container>
      <Container >
        <SearchForFriends />
        <h1>Welcome back {user.firstName}</h1>
        <button onClick={() => console.log(user)}>log user</button>
      </Container>
      <Container>
        <FriendsList />
      </Container>
    </Container>
  )
}
