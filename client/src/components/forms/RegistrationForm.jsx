import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const classes = useStyles()
  const api = `http://localhost:8000/api/users/register`

  const refreshPage = () => {
    window.location.reload()
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const user = {
      firstName: firstName,
      lastName: lastName,
      email: userEmail,
      password: userPassword
    }
    await axios
      .post(api, user)
      .then(response => {
        localStorage.setItem('token', response.headers['x-auth-token'])
        setOpenPopup(false)
        navigate('/home')
        refreshPage()
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
            onChange={e => setFirstName(e.target.value)}
            className={classes.field}
            label='Enter your First Name'
            variant='outlined'
            fullWidth
            required
          />

          <TextField
            style={{ marginBottom: 20 }}
            onChange={e => setLastName(e.target.value)}
            className={classes.field}
            label='Enter your Last Name'
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
