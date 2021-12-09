import React from 'react'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export default function UserCard (props) {

  const { children, firstName, lastName, dateJoined } = props

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
