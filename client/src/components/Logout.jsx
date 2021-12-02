import { useNavigate } from "react-router-dom"

const Logout = (e) => {
  e.preventDefault()
  const navigate = useNavigate
  localStorage.removeItem('token')
  navigate('/')
}

export default Logout
