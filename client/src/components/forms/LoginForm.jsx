import React, { useState } from 'react'
import axios from 'axios'
import { FormControl, Container, Button, TextField } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block',
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block',
    color: '#bd93f9',
  },
})

export default function LoginForm() {

  const [ userEmail, setUserEmail ] = useState('')
  const [ userPassword, setUserPassword ] = useState('')
  const [ loginUser, setLoginUser ] = useState({})
  const classes = useStyles()

  const api = `http://localhost:8000/api/auth`

  const handleSubmit = async e => {
    e.preventDefault()
    setLoginUser({
      "email": userEmail,
      "password": userPassword
    })
  
    try { 
      await axios.post(api, loginUser).then(response => {
        console.log(response)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>

      <FormControl onSubmit={handleSubmit}>

        <TextField 
          style={{marginBottom: 20}}
          onChange={e => setUserEmail(e.target.value)}
          className={classes.field}
          label='Enter your email'
          variant='outlined'
          fullWidth
          required
        />

        <TextField 
          style={{marginBottom: 20}}
          onChange={e => setUserPassword(e.target.value)}
          className={classes.field}
          label='Enter a password'
          variant='outlined'
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
      
    </Container>
  )
}
