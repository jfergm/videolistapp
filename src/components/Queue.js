import { useContext } from 'react'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


import QueueItem from './QueueItem';

import { QueueContext } from '../providers/QueueProvider';

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%'
  },
}));

const Queue = () => {
  const classes = useStyles();
  const { queue } = useContext(QueueContext);
  return(
    <Grid container>
      {
        queue.queue.map( (item, i) => {
          return(
            <Grid item key={i} className={classes.fullWidth}>
              <QueueItem item={item} index={i} playing={i == queue.currentIndex }/>
            </Grid>
          )
        })
      }
    </Grid>
  );
}

export default Queue