import { useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from  '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider'

import DeleteIcon from '@material-ui/icons/Delete';
import { QueueContext } from '../providers/QueueProvider';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%'
  },
  playing: {
    width: '7%',
  },
  itemInfo: {
    width: '86%'
  },
  delete: {
    width: '7%'
  }
}));

const QueueItem = (props) => {
  const classes = useStyles();

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
    <>
     <Divider />
      <Grid container className={classes.container} justify="center" justify="space-between">
        <Grid item className={classes.playing} >
          { props.playing ? '>' : props.index + 1}
        </Grid>
        <Grid item className={classes.itemInfo}>
          <Grid container direction="column" className={classes.container}>
            <Grid item>
              <Typography variant="subtitle1" color="secondary">{ props.item.title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{props.item.duration}</Typography>
            </Grid>
          </Grid>
        </Grid> 
        <Grid item className={classes.delete}>
          <IconButton onClick={handleDelete} disabled={props.playing}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

export default QueueItem;