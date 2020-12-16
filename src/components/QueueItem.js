import { useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from  '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import PlayingIcon from '@material-ui/icons/PlayArrow';
import { QueueContext } from '../providers/QueueProvider';

const QueueItem = (props) => {
  const [queue, setQueue] = useContext(QueueContext);

  const handleDelete = () => {
    const newQueue = queue.queue.reduce( (acc, curr, index) => {
      if(index != props.index) {
        acc.push(curr);
      }
      return acc;
    }, []);

    let newCurrentIndex = queue.currentIndex;

    if(queue.currentIndex > props.index) {
      newCurrentIndex = props.index - 1
    }
    setQueue({queue: [...newQueue], currentIndex: newCurrentIndex});
  }

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
            <Typography variant="subtitle1">{props.item?.duration}</Typography>
          </Grid>
        </Grid>
      </Grid> 
      <Grid item>
        {
          !props.playing &&
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
      </Grid>
    </Grid>
    
  );
}

export default QueueItem;