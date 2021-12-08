import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles, Menu, MenuItem } from '@material-ui/core'
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { deepPurple, pink } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => {
  return {
    page: {
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  }
})

export default function MainAppBar(props) {

  const { children, check, change, isAuth } = props

  const classes = useStyles()
  const navigate = useNavigate

  function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  function HideOnScroll(props) {
    const { children, window } = props;
  
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  let authMenu = (
    <>
    <span>
      <Link
        to='/profile'
        style={{ textDecoration: 'none' }}
      >
        <AccountCircle />
      </Link>
      </span>
      <span>
      <Link
        to='/'
        style={{ textDecoration: 'none' }}
        onClick={() => logout()}
      >
        Logout
      </Link>
      </span>
    </>
  )
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar 
          position="fixed" 
          elevation={10} 
          style={{ backgroundColor: check ? pink[200] : deepPurple[300] }} 
          enableColorOnDark
          >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
              ello gov'na
            </Typography>

              {isAuth ? authMenu : 'plz login'}

            <IconButton sx={{ ml: 1 }} onClick={change} color="inherit">
              {check ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

          </Toolbar>
        </AppBar>
      </HideOnScroll>
        <div className={classes.page}>
          <div className={classes.toolbar}>
        </div>
          {children}
        </div>
    </Box>
  );
}
