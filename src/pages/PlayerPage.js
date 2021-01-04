import { useContext } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import YTPlayer from '../components/YTPlayer';
import PlayerControls from '../components/PlayerControls';
import Queue from '../components/Queue';

import { QueueContext } from '../providers/QueueProvider';
import { CurrentVideoContext } from '../providers/CurrentVideoProvider';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
  },
  player: {
    width: '70%',
    height: '100%',
  },
  actionsContainer: {
    width: '30%',
    height: '100%',
  },
  list: {
    maxHeight: '90%',
    width: '100%',
    overflow: 'auto'

  },
  controls: {
    width: '100%',
    height: '10%',
  }
}));

const PlayerPage = () => {
  const classes = useStyles();
  const queueContext = useContext(QueueContext);

  return(
      <Grid container className={classes.container} >
        <Grid item className={classes.player}>
          {<YTPlayer queueContext = {queueContext}/>}
        </Grid>
        <Grid item className={classes.actionsContainer}>
          <Grid container direction="column" className={classes.container}>
            <Grid item className={classes.controls}>
              <PlayerControls queueContext = {queueContext} />
            </Grid>
            <Grid item className={classes.list}>
              {<Queue />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
}

export default PlayerPage;