import React from 'react'
import { Avatar, ButtonGroup, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'

export default function UserCard (props) {

  const { firstName, lastName, dateJoined, sendAction, buttonText } = props

  return (
    <Card elevation={5} key={firstName}>
      <CardHeader 
      avatar={
        <Avatar
          color='primary'
        >
          {firstName[0]}
        </Avatar>
      } 
        action={
          <ButtonGroup variant='contained'>
            <IconButton>
            <Button
                color='secondary'
                onClick={sendAction}
              >
                {buttonText}
            </Button>
            </IconButton>
        </ButtonGroup>
        
        
        }
      />
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
