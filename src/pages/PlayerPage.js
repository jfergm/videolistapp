import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import YTPlayer from '../components/YTPlayer';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: 0,
    height: '100%'
  },
  player: {
    width: '75%'
  }
}));

const PlayerPage = () => {
  const classes = useStyles();

  return(
      <Grid container className={classes.container} >
        <Grid item className={classes.player}>
          <YTPlayer />
        </Grid>
        <Grid item>
          <div>Lista</div>
        </Grid>
      </Grid>
  );
}

export default PlayerPage;