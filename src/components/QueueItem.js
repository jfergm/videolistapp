import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from  '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import PlayingIcon from '@material-ui/icons/PlayArrow';

const QueueItem = (props) => {
  return (
    <Grid container p={2} alignItems="center" justify="space-between">
      <Grid item>
        {props.playing && <PlayingIcon />}
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h6" color="secondary">{props.item?.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle">{props.item?.duration}</Typography>
          </Grid>
        </Grid>
      </Grid> 
      <Grid Item>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
    
  );
}

export default QueueItem;