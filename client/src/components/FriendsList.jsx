import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import UserContext from '../context/UserContext'
import Controls from './controls/Controls'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function FriendsList () {
  const { user } = useContext(UserContext)
  const [friendsList, setFriendsList] = useState([])
  const classes = useStyles()

  const getFriendsList = () => {
    user.friendsList?.map(async friends => {
      let response = await axios.get(
        `http://localhost:8000/api/users/${friends}`
      )
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

      <Container
        className={classes.field}
        style={{ display: 'flex', marginTop: '75px' }}
      >
        <Grid container spacing={3}>
          {friendsList.map(friends => (
            <Grid item key={friends.firstName} sx={12} md={12} lg={12}>
              <Controls.UserCard elevation={5} key={friends}
                firstName={friends.firstName}
                lastName={friends.lastName}
                dateJoined={friends.dateJoined}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
