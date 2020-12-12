import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import YTPlayer from '../components/YTPlayer';
import PlayerControls from '../components/PlayerControls';

import { CurrentVideoProvider } from '../providers/CurrentVideoProvider';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: 0,
    height: '100%'
  },
  player: {
    width: '75%'
  },
  actionsContainer: {
    flex: 1
  },
  list: {
    flex: 1 
  }
}));

const PlayerPage = () => {
  const classes = useStyles();

  return(
    <CurrentVideoProvider>
      <Grid container className={classes.container} >
        <Grid item className={classes.player}>
          <YTPlayer />
        </Grid>
        <Grid item className={classes.actionsContainer}>
          <Grid container direction="column" className={classes.container}>
            <PlayerControls />
            <Grid item className={classes.list}>
              list
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CurrentVideoProvider>
  );
}

export default PlayerPage;