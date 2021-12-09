import React  from 'react'
import { Box, Card, Container, Typography, Avatar } from '@material-ui/core'
import CommentBox from '../components/CommentBox'

export default function ViewFriendProfile (props) {

  const { firstName, lastName, posts } = props
  
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

        <Container key={posts}>
          {posts?.map(post => (
            <Card>
              {firstName} says: {post}
            </Card>
          ))}
        </Container>

        <CommentBox />
      </Container>
    </>
  )
}
