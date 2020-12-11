import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  YTPlayer: {
    width: '100%',
    height: '100%'
  }
}));

const onPlayerReady = (event) => {
  event.target.setVolume(100);
  event.target.playVideo();
}


const YTPlayer = () => {
  const classes = useStyles();

  const [player, setPlayer] = useState();
  const [videoId, setVideoId] = useState('-Y-50npRo8k');

  useEffect( () => {
    if(!player) {
      setPlayer(new window['YT'].Player('YTPlayer', {
        videoId,
        events: {
          'onReady': onPlayerReady,
        }
      }));
    } else {
      try {
        player.playVideo();
      } catch(e) {

      }
    }
  })

  return(
    <div id="YTPlayer" className={classes.YTPlayer}>
    </div>

  );
}

export default YTPlayer;