import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import PlayButtonIcon from '@material-ui/icons/PlayArrow';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { Link, useLocation } from 'react-router-dom';
import DialogConfigDevice from './DialogConfigDevice';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({  
  icon: {
    width: '50%',
    height: '50%',
  },
  button: {
    marginTop: '2%',
    marginBottom: '2px'
  },
  active: {
    color: theme.palette.secondary.main
  },
}));

const Menu = () => {
  const classes = useStyles();
  const location = useLocation();
  const [ dialogConfigDeviceOpen, setDialogConfigDeviceOpen] = useState(false);

  const handleClose = () => {
    console.log("xddxclose")
    setDialogConfigDeviceOpen(false);
  }

  return(
    <Box style={{width: '100%', height: '100%'}} boxShadow={3}> 
      <div style={{height: '3%'}}>
      
      </div>

      <Button  component={Link} to="player" className={clsx(classes.button, {
          [classes.active]: location.pathname === '/player' && !dialogConfigDeviceOpen,
        })}>
        <PlayButtonIcon className={classes.icon} />
      </Button>
      
      <Button component={Link} to="playlists" className={clsx(classes.button, {
          [classes.active]: location.pathname === '/playlists' && !dialogConfigDeviceOpen,
        })}>
        <PlaylistPlayIcon className={classes.icon} />
      </Button>
      <Divider />

      <Button component={Link} to="settings" className={clsx(classes.button, {
          [classes.active]: location.pathname === '/settings' && !dialogConfigDeviceOpen,
        })}>
        <SettingsIcon className={classes.icon}/>      
      </Button>

      <Button className={clsx(classes.button, {
          [classes.active]: dialogConfigDeviceOpen,
        })} onClick={ () => setDialogConfigDeviceOpen(true)}>
        <PhonelinkSetupIcon className={classes.icon} />
      </Button>
      <Divider />
      <DialogConfigDevice isOpen={dialogConfigDeviceOpen} handler={handleClose}/>
    </Box>
  )
}

export default Menu;