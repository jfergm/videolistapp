import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { IconButton, List, ListItem, ListItemIcon } from '@material-ui/core';
import PlayButtonIcon from '@material-ui/icons/PlayArrow';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paperDrawer: {
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(12) + 1,
    },
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer, classes.draweClose}
      classes={{
        paper: classes.paperDrawer
      }}
    >
      <List>
        <Grid alignContent="center" >
          <Grid item>
          <Box borderRadius="50%" >
            <ListItem>
              <IconButton size="medium">
                <PlayButtonIcon fontSize="large" />
              </IconButton>
            </ListItem>
          </Box>
          </Grid>
        </Grid>
      </List>
      <Divider />
      <List>
        <Grid alignContent="center" >
          <Grid item>
          <Box borderRadius="50%" >
            <ListItem>
              <IconButton size="medium">
                <PlaylistPlayIcon fontSize="large" />
              </IconButton>
            </ListItem>
          </Box>
          </Grid>
        </Grid>
      </List>
      <Divider />
      <List>
        <Grid alignContent="center" >
          <Grid item>
          <Box borderRadius="50%" >
            <ListItem>
              <IconButton size="medium">
                <SettingsIcon fontSize="large" />
              </IconButton>
            </ListItem>
          </Box>
          </Grid>
        </Grid>
      </List>
    </Drawer>
  );
}

export default Menu;