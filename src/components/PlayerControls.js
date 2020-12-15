import { useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { IconButton, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

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
  const [open, setOpen] = useState(false);
  const [videoIdToQueue, setvideIdToQueue] = useState('');

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

  const handleAddToQueue = () => {
    const [queue, setQueue ] = queueContext;
    queue.queue.push({videoId: videoIdToQueue});
    setQueue({...queue});
    handleClose();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setvideIdToQueue('');
  };

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
          <IconButton className={classes.controlsButton} onClick={handleClickOpen}>
            <QueueIcon color="secondary"/>
          </IconButton>
        </Grid>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add new item
            </DialogContentText>
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              id="name"
              label="video id"
              type="text"
              value={videoIdToQueue}
              onChange={ (e) => setvideIdToQueue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddToQueue} color="secondary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default PlayerControls;