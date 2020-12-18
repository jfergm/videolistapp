import { useState, createContext } from 'react'

export const QueueContext = createContext();

export const QueueProvider = props => {
  const [queue, setQueue] = useState({
    queue: [],
    currentIndex: null,
    ended: true,
  });

  return (
    <QueueContext.Provider value={[queue, setQueue]}>
      { props.children }
    </QueueContext.Provider>
  );
};

