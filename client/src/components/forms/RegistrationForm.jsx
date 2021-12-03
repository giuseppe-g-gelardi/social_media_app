import React, { useState, useContext } from 'react'
import axios from 'axios'
import { FormControl, Container, Button, TextField } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core/styles'
// import jwtDecode from 'jwt-decode'

import { AuthContext } from '../../context/AuthContext'


const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block',
    color: '#bd93f9'
  }
})

export default function RegistrationForm (props) {

  const { setOpenPopup } = props

  const { isAuth, setIsAuth } = useContext(AuthContext)


  // const [newUser, setNewUser] = useState({})
  // const [user, setUser] = useState({})
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const classes = useStyles()
  const api = `http://localhost:8000/api/users/`

  const handleSubmit = async e => {
    e.preventDefault()

    const user = {
      name: userName,
      email: userEmail,
      password: userPassword
    }
    axios
      .post(api, user)
      .then(response => {
        localStorage.setItem('token', response.headers['x-auth-token'])
        setIsAuth(true)
        setOpenPopup(false)
        // const user = jwtDecode(localStorage.getItem('token'))
      })
      .catch(error => {
        console.log(`Axios error: `, error)
      })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl>
        <Button onClick={() => console.log(isAuth)}>logger</Button>

          <TextField
            style={{ marginBottom: 20 }}
            onChange={e => setUserName(e.target.value)}
            className={classes.field}
            label='Enter your name'
            variant='outlined'
            fullWidth
            required
          />

          <TextField
            style={{ marginBottom: 20 }}
            onChange={e => setUserEmail(e.target.value)}
            className={classes.field}
            label='Enter your email'
            variant='outlined'
            fullWidth
            required
          />

          <TextField
            style={{ marginBottom: 20 }}
            onChange={e => setUserPassword(e.target.value)}
            className={classes.field}
            label='Enter a password'
            variant='outlined'
            type='password'
            fullWidth
            required
          />

          <Button
            type='submit'
            color='primary'
            variant='contained'
            endIcon={<KeyboardArrowRightIcon />}
          >
            Register Account!
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}
