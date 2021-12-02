import React from 'react'
import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'

export default function Landing() {
  return (
    <div>
      <h1>Landing page</h1>
      <RegistrationPage />
      <LoginPage />
    </div>
  )
}

