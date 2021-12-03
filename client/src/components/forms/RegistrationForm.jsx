import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FormControl, Container, Button, TextField } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core/styles'

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
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const navigate = useNavigate()
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
        setOpenPopup(false)
        navigate('/home')
      })
      .catch(error => {
        console.log(`Axios error: `, error)
      })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl>

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
