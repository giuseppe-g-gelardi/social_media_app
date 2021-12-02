import React, { useState } from 'react'
import { Button, Container } from '@material-ui/core'

import RegistrationForm from '../components/forms/RegistrationForm'
import Controls from '../components/controls/Controls'

export default function RegistrationPage(props) {

  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Container>

      <Button
        onClick={() => setOpenPopup(true)}
      >
        Register
      </Button>

      <Controls.Popup
        text='Register Account'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RegistrationForm />
      </Controls.Popup>
      
    </Container>
  )
}
