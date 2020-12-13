import { useState, createContext } from 'react'

export const QueueContext = createContext();

export const QueueProvider = props => {
  const [queue, setQueue] = useState({
    queue: [
      {
        videoId: 'XbCDUiovJNs',
      },
      {
        videoId: '0ITLTAyrP10',
      },
      {videoId: 'Yyfmf-NEZbI'}
    ],
    currentIndex: null
  });

  return (
    <QueueContext.Provider value={[queue, setQueue]}>
      { props.children }
    </QueueContext.Provider>
  );
};

