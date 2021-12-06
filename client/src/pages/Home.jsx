import React, { useContext } from 'react'
import { Container } from '@material-ui/core'
import FriendsList from '../components/FriendsList'

import UserContext from '../context/UserContext'

export default function Home() {
  const { user } = useContext(UserContext)
  
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

// const [user, setUser] = useState({})

  // useEffect(() => {
  //   getUserFromToken()
  // }, [])

  // const getUserFromToken = () => {
  //   const token = localStorage.getItem('token')

  //   if (token) {
  //       const userid = jwtDecode(localStorage.getItem('token'))._id
 
  //       axios
  //         .get(`http://localhost:8000/api/users/${userid}`, {
  //           headers: { 'x-auth-token': token }
  //         })
  //         .then(response => {
  //           console.log(response.data)
  //           setUser(response.data)
  //         })
  //         .catch(error => {
  //           console.log(`Axios error: `, error)
  //         })
  //   } else {
  //     return;
  //   }
  // }