import { Component } from 'react';

import { CurrentVideoContext } from '../providers/CurrentVideoProvider';

const YTPlayerStyle = {
  width: '95%',
  height: '100%'
}

class YTPlayer extends Component {
  static contextType =  CurrentVideoContext ;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const [currentVideo, setCurrentVideo] = this.context;
    const [queue, setQueue] = this.props.queueContext;
    let videoId = null;
    if(queue.queue) {
      setQueue({...queue, currentIndex: 0});
      setCurrentVideo({...queue.queue[0]});
      videoId = queue.queue[0].videoId;
    }
    this.player = new window['YT'].Player('YTPlayer', {
      videoId,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onReady': (e) => {
          e.target.setVolume(0);
        }
      }
    });
  }

  componentDidUpdate() {
    const [currentVideo, setCurrentVideo] = this.context;

    if(currentVideo.hasOwnProperty('videoId')) {
      if(currentVideo.hasOwnProperty('playing')) {
        if(currentVideo.playing) {
          this.player.playVideo()
        } else {
          this.player.pauseVideo();
        }
      }
    }
    /*try {
      if(currentVideo.hasOwnProperty('videoId')) {
        console.log("videoId", currentVideo.hasOwnProperty('videoId'))
        if(currentVideo.hasOwnProperty('playing')) {
          console.log("playing", currentVideo.hasOwnProperty('playing'))
          
          if(currentVideo.playing) {
            this.player.playVideo();
          } else {
            this.player.pauseVideo();
          }
        } else {
          console.log("playing", currentVideo.hasOwnProperty('playing'), this.player)
          this.player.loadVideoById({videoId: currentVideo.videoId})
          setCurrentVideo({...currentVideo, playing: true})
        }
      }
    } catch(e) {

    }*/

  }

  render() {
    return (
      <div id="YTPlayer" style={YTPlayerStyle}></div>
    );
  }

  onPlayerStateChange(event) {
    console.log(event);
    const[currentVideo, setCurrentVideo] = this.context;
    const[queue, setQueue] = this.props.queueContext;
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        setCurrentVideo({...currentVideo, playing: true})
        break;
      case window['YT'].PlayerState.PAUSED:
        setCurrentVideo({...currentVideo, playing: false})
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        
        
        if(queue.currentIndex < queue.queue.length - 1) {
          //setCurrentVideo({...queue.queue[queue.currentIndex + 1]})
          console.log("falta", )
          this.player.loadVideoById({ videoId: queue.queue[queue.currentIndex + 1].videoId})
          setQueue({...queue, currentIndex: queue.currentIndex + 1})
          setCurrentVideo({...queue.queue[queue.currentIndex + 1]})
        }
        break;
      case window['YT'].PlayerState.CUED:
        break;
    };
  };
}

export default YTPlayer;