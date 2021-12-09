import React, { useContext } from 'react'
import { Container, Typography } from '@material-ui/core'
import FriendsList from '../components/FriendsList'

import UserContext from '../context/UserContext'

export default function Home () {
  const { user } = useContext(UserContext)

  return (
    <Container>
      <Container>
        <Typography variant='h2'>
          Welcome back {user.firstName}
        </Typography>
      </Container>
      <Container>
        <FriendsList />
      </Container>
    </Container>
  )
}
