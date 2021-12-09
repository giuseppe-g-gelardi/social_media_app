import { Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'

export default function Landing () {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '50vh' }}
      >
        <Container style={{ display: 'flex' }}>
          <Typography variant='h2'>Hiiiiii</Typography>
        </Container>
        <Container>
          <Typography variant='h5'>Thanks for stopping by</Typography>
          <Container>
            <Typography variant='p'>
              for the privacy of our members...
            </Typography>
          </Container>
          <Container>
            <Typography variant='p'>
              you must register or login before you can view any content
            </Typography>
          </Container>
          <br />
          <Container>
            <Typography variant='p'>Thank you</Typography>
          </Container>
        </Container>
      </Grid>

      <RegistrationPage />
      <LoginPage />
    </div>
  )
}
