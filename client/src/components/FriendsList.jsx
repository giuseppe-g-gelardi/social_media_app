import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar, Card, CardContent, CardHeader, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import UserContext from '../context/UserContext'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
})

export default function FriendsList() {
  const { user } = useContext(UserContext)
  const [friendsList, setFriendsList] = useState([])
  const classes = useStyles()
  // let friendsArray = []

  const getFriendsList = () => {
    user.friendsList?.map(async friends => {
      let response = await axios.get(`http://localhost:8000/api/users/${friends}`)
      setFriendsList(friendsList => [...friendsList, response.data])
    })
    return friendsList
  }

  useEffect(() => {
    getFriendsList()
  }, [user])

  return (
    <div>
      <h1>display friends list</h1>
      <button onClick={() => console.log(user)}>log user</button>
      <button onClick={() => console.log(friendsList)}>friends list</button>
      
      <Container className={classes.field} style={{ display: 'flex', marginTop: '75px'}}>
        <Grid container spacing={3}>
          {friendsList.map(friends => 
          <Grid item key={friends.name} sx={12} md={12} lg={12}>

          
          <Card elevation={5} key={friends.name}>
            <CardHeader 
              avatar={
                <Avatar>
                  {friends.name[0]}
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary'>
                {friends.name}
              </Typography>
            </CardContent>

          </Card>
          </Grid>
          )}
        </Grid>

      </Container>
    </div>
  )
}
