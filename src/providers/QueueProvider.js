import { useState, createContext, useContext, useEffect } from 'react';

import { SocketContext } from './SocketProvider';

export const QueueContext = createContext();

export const QueueProvider = props => {
  let [socket] = useContext(SocketContext);
  const [queue, setQueue] = useState({
    queue: [],
    currentIndex: null,
    ended: true,
  });
  useEffect( () => {
    socket.on('message', message => {
      console.log(message)
    })
  }, [])

  return (
    <QueueContext.Provider value={[queue, setQueue]}>
      { props.children }
    </QueueContext.Provider>
  );
};

