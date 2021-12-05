import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import FriendsList from '../components/FriendsList'


export default function Home() {
  const [user, setUser] = useState({})

  useEffect(() => {
    getUserFromToken()
  }, [])

  const getUserFromToken = () => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const userid = jwtDecode(localStorage.getItem('token'))._id
 
        axios
          .get(`http://localhost:8000/api/users/${userid}`, {
            headers: { 'x-auth-token': token }
          })
          .then(response => {
            console.log(response.data)
            setUser(response.data)
          })
          .catch(error => {
            console.log(`Axios error: `, error)
          })
      } catch (err) {
        console.log(err)
      }
    } else {
      return;
    }
  }

  return (
    <Container>
      <Container >
        <h1>Welcome back {user.name}</h1>
        <button onClick={() => console.log(user)}>log user</button>
      </Container>
      <Container>
        <FriendsList user={user} />
      </Container>
    </Container>
  )
}
