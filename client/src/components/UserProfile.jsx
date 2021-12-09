import React, { useContext } from 'react'
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core'
import UserContext from '../context/UserContext'
import CommentBox from '../components/CommentBox'

export default function UserProfile () {
  const { user } = useContext(UserContext)

  
  


  return (
    <>
      <Container style={{ display: 'grid', justifyContent: 'center', marginTop: '10%' }}>
        <Box>
          <Avatar>
              {user?.firstName[0]}
              {user?.lastName[0]}
          </Avatar>
        </Box>
          

          <Typography variant='h1'>Hey!</Typography>

          <Typography variant='h3'>
            I'm {user.firstName} {user.lastName}
          </Typography>

          <Container key={user.posts}>
            {user.posts?.map(post => <Card>{user.firstName} says: {post}</Card>)}
          </Container>

          <CommentBox />
      </Container>
    </>
  )
}
