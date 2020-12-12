import { useContext, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { IconButton, Slider } from '@material-ui/core';

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import { CurrentVideoContext } from '../providers/CurrentVideoProvider';


const useStyles = makeStyles((theme) => ({
  controls: {
    height: '15%',
    width: '100%',
    padding: theme.spacing(2)
  },
  controlsButton: {
    border: `1px solid ${theme.palette.secondary.main}`,
  }
}));

const PlayerControls = () => {
  const classes = useStyles();
  const [currentVideo, setCurrentVideo] = useContext(CurrentVideoContext);

  return(
    <Grid item className={classes.controls}>
      <Grid container justify="center" spacing={3}>
        <Grid item>
          <IconButton size="medium" className={classes.controlsButton}>
            <SkipPreviousIcon fontSize="large" color="secondary" />
          </IconButton>
        </Grid>
        <Grid item m={1}>
          <IconButton size="medium" className={classes.controlsButton} onClick={ () => setCurrentVideo({...currentVideo, playing: !currentVideo.playing})}>
            { currentVideo.playing && (<PauseIcon fontSize="large" color="secondary"/>)}
            { !currentVideo.playing && (<PlayIcon fontSize="large" color="secondary" />)}

            
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size="medium" className={classes.controlsButton}>
            <SkipNextIcon fontSize="large" color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDownIcon color="secondary" />
        </Grid>
        <Grid item xs>
          <Slider color="secondary" aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <VolumeUpIcon color="secondary" />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PlayerControls;