import { useContext } from 'react'
import UserContext from '../context/UserContext'
// import CommentBox from '../components/CommentBox'
import UserProfile from '../components/UserProfile'

export default function Profile() {
  const { user } = useContext(UserContext)

  const username = user.firstName

  return (
    <>
      {/* <h1> {username}'s profile!</h1> */}
        <UserProfile />
        {/* * <CommentBox /> */}
    </>
  )
}

