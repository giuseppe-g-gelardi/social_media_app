import React, { useState } from 'react'
import { Button, Container } from '@material-ui/core'
import SearchIcon from '@mui/icons-material/Search'


import Controls from '../components/controls/Controls'
import SearchForFriends from '../components/SearchForFriends'

export default function SearchFriendsPage() {

  const [openPopup, setOpenPopup] = useState(false)

  return (
    <Container>

      <Button
        onClick={() => setOpenPopup(true)}
      >
        <SearchIcon />
        search members!
      </Button>

      <Controls.Popup
        text='Search for new Friends!'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SearchForFriends setOpenPopup={setOpenPopup} />
      </Controls.Popup>
      
    </Container>
  )
}
