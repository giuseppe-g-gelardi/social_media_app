import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export default function FriendsList(props) {

  const { user } = props
  const friends = user.friendsList

  const getFriendsList = () => {
    const token = localStorage.getItem('token')

    if (token) {
        const userid = jwtDecode(localStorage.getItem('token'))._id
 
        axios
          .get(`http://localhost:8000/api/users/${userid}`, {
            headers: { 'x-auth-token': token }
          })
          .then(response => {
            console.log(response.data)
            // hook to push to friendslist
          })
          .catch(error => {
            console.log(`Axios error: `, error)
          })
    } else {
      return;
    }
  }



  return (
    <div>
      <h1>display friends list</h1>
      <button onClick={() => console.log(friends)}>log friends</button>
    </div>
  )
}
