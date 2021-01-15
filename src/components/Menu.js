import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { IconButton, List, ListItem } from '@material-ui/core';

import PlayButtonIcon from '@material-ui/icons/PlayArrow';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { Link } from 'react-router-dom';
import DialogConfigDevice from './DialogConfigDevice';

const useStyles = makeStyles((theme) => ({

  drawer: {
    width: theme.spacing(12) + 1,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    height: '100%'
  },
  paperDrawer: {
    overflowX: 'hidden',
    height: '100%',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(12) + 1,
    },
  },
}));

const Menu = () => {
  const classes = useStyles();
  const [ dialogConfigDeviceOpen, setDialogConfigDeviceOpen] = useState(false);

  const handleClose = () => {
    console.log("xddxclose")
    setDialogConfigDeviceOpen(false);
  }

  return (
    <div className={classes.drawer}>
      <Paper className={classes.paperDrawer}>
      <List>
        <Grid container alignContent="center" >
          <Grid item>
          <Box borderRadius="50%" >
            <ListItem>
              <IconButton size="medium" component={Link} to="/player">
                <PlayButtonIcon fontSize="large" />
              </IconButton>
            </ListItem>
          </Box>
          </Grid>
        </Grid>
      </List>
      <Divider />
      <List>
        <Grid container alignContent="center" >
          <Grid item>
          <Box borderRadius="50%" >
            <ListItem>
              <IconButton size="medium" component={Link} to="/playlists">
                <PlaylistPlayIcon fontSize="large" />
              </IconButton>
            </ListItem>
          </Box>
          </Grid>
        </Grid>
      </List>
      <Divider />
      <List>
        <Grid container alignContent="center" >
          <Grid item>
          <Box borderRadius="50%" >
            <ListItem>
              <IconButton size="medium" component={Link} to="/settings">
                <SettingsIcon fontSize="large" />
              </IconButton>
            </ListItem>
          </Box>
          </Grid>
        </Grid>
      </List>
      <Divider />
      <List>
        <Grid container alignContent="center" >
          <Grid item>
          <Box borderRadius="50%" >
            <ListItem>
              <IconButton size="medium" onClick={ () => setDialogConfigDeviceOpen(true)}>
                <PhonelinkSetupIcon fontSize="large" />
              </IconButton>
            </ListItem>
          </Box>
          </Grid>
        </Grid>
      </List>
      </Paper>

      <DialogConfigDevice isOpen={dialogConfigDeviceOpen} handler={handleClose}/>


    </div>
  );
}

export default Menu;