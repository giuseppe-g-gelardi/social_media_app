import React from 'react'
import { Container } from '@material-ui/core'

import FriendsList from '../components/FriendsList'


export default function Home(props) {

  const { user } = props

  return (
    <Container>
      <Container >
        <h1>Welcome back {user.name}</h1>
        <button onClick={() => console.log(user)}>log user</button>
      </Container>
      <Container>
        <FriendsList user={user} />
      </Container>
    </Container>
  )
}
