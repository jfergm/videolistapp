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
import QueueIcon from '@material-ui/icons/Queue';

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

const PlayerControls = ({ queueContext }) => {
  const classes = useStyles();
  const [currentVideo, setCurrentVideo] = useContext(CurrentVideoContext);

  const handleNext = () => {
    const [queue, setQueue ] = queueContext;
    const currentIndex = queue.currentIndex;

    if(currentIndex < queue.queue.length - 1) {
      setQueue({ ...queue, currentIndex: currentIndex + 1})
      setCurrentVideo({...queue.queue[currentIndex + 1]})
    }
  }

  const handlePrevious = () => {
    const [queue, setQueue ] = queueContext;
    const currentIndex = queue.currentIndex;

    if(currentIndex > 0) {
      setQueue({ ...queue, currentIndex: currentIndex - 1})
      setCurrentVideo({...queue.queue[currentIndex - 1]})
    }
  }

  return(
    <Grid item className={classes.controls}>
      <Grid container justify="space-between">
        <Grid item>
          <IconButton className={classes.controlsButton} onClick={handlePrevious}>
            <SkipPreviousIcon color="secondary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.controlsButton} onClick={ () => setCurrentVideo({...currentVideo, playing: !currentVideo.playing})}>
            { currentVideo.playing && (<PauseIcon color="secondary"/>)}
            { !currentVideo.playing && (<PlayIcon color="secondary" />)}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.controlsButton} onClick={handleNext}>
            <SkipNextIcon color="secondary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.controlsButton}>
            <QueueIcon color="secondary"/>
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