import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  FormControl,
  Grid,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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

export default function SearchForFriends () {
  const [allUsers, setAllUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const api = `http://localhost:8000/api/users/`

  const classes = useStyles()

  const getUsers = async () => {
    await axios.get(api).then(res => setAllUsers(res.data)).catch(e => console.log(e))
  }

  useEffect(() => {
    getUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Container>
        <Container
          className={classes.field}
          style={{ display: 'flex', marginTop: '75px' }}
        >
          <FormControl>
            <TextField
              style={{ flexGrow: 1 }}
              label='Search...'
              className={classes.text}
              variant='outlined'
              onChange={e => setSearchTerm(e.target.value)}
            />
          </FormControl>
        </Container>
      </Container>

      <Container>
        <Grid container spacing={1}>
          {allUsers
            // eslint-disable-next-line array-callback-return
            .filter((val, i) => {
              let searchString = ''
              for (let value of Object.entries(val)) {
                searchString += `${value}\t`
              }
              if (searchTerm === '') {
                return val
              } else if (
                searchString.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val
              }
            })
            .map((user, i) => (
              <Grid item key={user._id} sx={12} md={6} lg={4}>
                <Controls.UserCard
                  firstName={user.firstName}
                  lastName={user.lastName}
                  dateJoined={user.dateJoined}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  )
}
