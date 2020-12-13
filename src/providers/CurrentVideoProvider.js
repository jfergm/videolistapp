import { useState, createContext } from 'react'

export const CurrentVideoContext = createContext();

export const CurrentVideoProvider = props => {
  const [currentVideo, setCurrentVideo] = useState({

  });

  return (
    <CurrentVideoContext.Provider value={[currentVideo, setCurrentVideo]}>
      { props.children }
    </CurrentVideoContext.Provider>
  );
};

