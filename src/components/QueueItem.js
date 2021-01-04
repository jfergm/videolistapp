import { useContext } from 'react';

import IconButton from  '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import { QueueContext } from '../providers/QueueProvider';
import { CurrentVideoContext } from '../providers/CurrentVideoProvider';

const QueueItem = (props) => {
  const {queue, setCurrentIndex, removeFromList} = useContext(QueueContext);
  const { setCurrentVideo } = useContext(CurrentVideoContext);

  const handleDelete = () => {
    let newCurrentIndex = queue.currentIndex;

    if(queue.currentIndex > props.index) {
      newCurrentIndex =newCurrentIndex - 1
    }
    removeFromList(props.index);
    setCurrentIndex(newCurrentIndex);
  }

  const handleItemClick = () => {
    if(props.playing || props.index < 0 || props.index > queue.queue.length - 1) return
    setCurrentIndex(props.index);
    setCurrentVideo({...queue.queue[props.index]})
  }

  return (
    <>
     {props.index > 0 && <Divider />}
    <ListItem button onClick={ handleItemClick }>
      <ListItemText
        primary={ props.item.title ? props.item.title : ' - '}
        secondary={props.item.duration ? props.item.duration : ' - '}
        primaryTypographyProps={{color: props.playing ? 'secondary' : 'textPrimary'}}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete} disabled={props.playing} edge='end'>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    </>
  );
}

export default QueueItem;