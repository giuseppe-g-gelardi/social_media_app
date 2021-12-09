import React from 'react'
import { Avatar, Card, CardContent, CardHeader, Typography } from '@material-ui/core'

export default function UserCard (props) {

  const { firstName, lastName, dateJoined } = props

  return (
    <Card elevation={5} key={firstName}>
      <CardHeader avatar={<Avatar>{firstName[0]}</Avatar>} />
      <CardContent>
        <Typography variant='body2' color='textSecondary'>
          {firstName} {lastName}
        </Typography>

        <Typography variant='body2' color='textSecondary'>
          member since {dateJoined}
        </Typography>
      </CardContent>
    </Card>
  )
}
