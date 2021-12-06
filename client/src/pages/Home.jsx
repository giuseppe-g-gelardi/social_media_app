import React, { useContext } from 'react'
import { Container } from '@material-ui/core'
import FriendsList from '../components/FriendsList'

import UserContext from '../context/UserContext'

export default function Home() {
  const { user } = useContext(UserContext)
  
  return (
    <Container>
      <Container >
        <h1>Welcome back {user.name}</h1>
        <button onClick={() => console.log(user)}>log user</button>
      </Container>
      <Container>
        <FriendsList />
      </Container>
    </Container>
  )
}
