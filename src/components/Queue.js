import { useContext } from 'react'

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';


import QueueItem from './QueueItem';

import { QueueContext } from '../providers/QueueProvider';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
}));

const Queue = () => {
  const classes = useStyles();
  const { queue } = useContext(QueueContext);
  return(
    <List className={classes.list}>
      {
        queue.queue.map( (item, i) => {
          return(
            <QueueItem item={item} index={i} playing={i === queue.currentIndex }/>
          )
        })
      }
    </List>
  );
}

export default Queue