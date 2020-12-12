import { useState, createContext } from 'react'

export const CurrentVideoContext = createContext();

export const CurrentVideoProvider = props => {
  const [currentVideo, setCurrentVideo] = useState({
    videoId: 'XbCDUiovJNs',
    playing: false
  });

  return (
    <CurrentVideoContext.Provider value={[currentVideo, setCurrentVideo]}>
      { props.children }
    </CurrentVideoContext.Provider>
  );
};

