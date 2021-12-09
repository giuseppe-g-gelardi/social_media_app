import React, { useContext } from 'react'
import { Box, Card, Container, Typography, Avatar } from '@material-ui/core'
import UserContext from '../context/UserContext'
import CommentBox from '../components/CommentBox'
import Controls from './controls/Controls'

export default function UserProfile () {
  const { user } = useContext(UserContext)

  const renderPostContainer = (
    <Container>
      {user.posts?.map(post => (
        <Controls.PostContainer post={post} firstName={user.firstName} />
      ))}
    </Container>
  )

  const noPosts = (
    <Container>
      <Card>
        <Typography variant='h2'>User has no posts to show</Typography>
      </Card>
    </Container>
  )

  return (
    <>
      <Container
        style={{ display: 'grid', justifyContent: 'center', marginTop: '10%' }}
      >
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

        {user.posts.length > 0 ? renderPostContainer : noPosts}
        <CommentBox />
      </Container>
    </>
  )
}
