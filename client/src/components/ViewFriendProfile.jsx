import React from 'react'
import { Box, Card, Container, Typography, Avatar } from '@material-ui/core'
import CommentBox from '../components/CommentBox'
import Controls from './controls/Controls'

export default function ViewFriendProfile (props) {
  const { firstName, lastName, posts } = props

  const renderPostContainer = (
    <Container>
      {posts?.map(post => (
        <Controls.PostContainer post={post} firstName={firstName} />
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
            {firstName[0]}
            {lastName[0]}
          </Avatar>
        </Box>

        <Typography variant='h1'>Hey!</Typography>

        <Typography variant='h3'>
          I'm {firstName} {lastName}
        </Typography>

        {posts.length > 0 ? renderPostContainer : noPosts}

        <CommentBox />
      </Container>
    </>
  )
}
