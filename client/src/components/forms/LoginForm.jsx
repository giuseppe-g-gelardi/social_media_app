import React, { useState, useContext } from 'react'
import axios from 'axios'
import { FormControl, Container, Button, TextField } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core/styles'

import userContext from '../../context/userContext'

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

export default function LoginForm (props) {

  const { setIsAuth } = useContext(userContext)

  const { setOpenPopup } = props

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userToken, setUserToken] = useState('')

  const classes = useStyles()


  const api = `http://localhost:8000/api/auth`

  const handleSubmit = async e => {
    e.preventDefault()

    const user = {
      email: userEmail,
      password: userPassword
    }
    axios
      .post(api, user)
      .then(response => {
        // console.log(response.data)
        setUserToken(response.data)
        localStorage.setItem('token', userToken)
        setIsAuth(true)
        setOpenPopup(false)
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
            Login
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}

