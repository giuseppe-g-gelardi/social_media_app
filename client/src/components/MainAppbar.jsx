import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core'
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

import Controls from './controls/Controls'

const useStyles = makeStyles((theme) => {
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

  const { children, check, change } = props
  const classes = useStyles()

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar position="fixed" elevation={10} color='transparent'>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
              Welcome to the Tubeee
            </Typography>
            

            <Controls.MuiSwitch onChange={change} checked={check} />
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
