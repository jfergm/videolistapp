import { useContext } from 'react'

import Divider from '@material-ui/core/Divider';

import QueueItem from './QueueItem';

import { QueueContext } from '../providers/QueueProvider';


const Queue = () => {
  const [queue, setQueue] = useContext(QueueContext);
  console.log(queue, "queuecomp")
  return(
    <div>
      {
        queue.queue.map( (item, i) => {
          return(
            <div>
              <QueueItem item={item} playing={i == queue.currentIndex }/>
              <Divider />
            </div>
          )
        })
      }
    </div>

  );
}

export default Queue