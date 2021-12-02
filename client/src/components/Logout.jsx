const Logout = () => {
  localStorage.removeItem('token')
  window.location.reload()
}

export default Logout
