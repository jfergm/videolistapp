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
      videoId = queue.queue[0].videoId;
    }
    this.player = new window['YT'].Player('YTPlayer', {
      videoId,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onReady': (e) => {
          e.target.setVolume(0);
          setCurrentVideo({...queue.queue[0]});
        }
      }
    });
  }

  componentDidUpdate() {
    const [currentVideo] = this.context;

    if(currentVideo.hasOwnProperty('videoId')) {
      if(currentVideo.hasOwnProperty('playing') ) {
        if(currentVideo.playing) {
          this.player.playVideo()
        } else {
          this.player.pauseVideo();
        }
      } else {
        if(this.player.hasOwnProperty('loadVideoById')) {
          this.loadAndPlay();
        }
      }
    }
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
        if(this.player.getCurrentTime() < 1) {
          if(!currentVideo.hasOwnProperty('title') || !currentVideo.hasOwnProperty('duration')) {
            this.updateItemInfo();
          }
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        setCurrentVideo({...currentVideo, playing: false})
        break;
      case window['YT'].PlayerState.ENDED:        
        
        if(queue.currentIndex < queue.queue.length - 1) {
          setQueue({...queue, currentIndex: queue.currentIndex + 1})
          setCurrentVideo({...queue.queue[queue.currentIndex + 1]})
        }
        break;
      case window['YT'].PlayerState.CUED:
        this.player.playVideo();
        break;
    };
  };

  updateItemInfo() {
    const [queue, setQueue] = this.props.queueContext;
    const item = queue.queue[queue.currentIndex];
    const videoData = this.player.getVideoData();
    item.title = videoData.title;
    item.duration = `${Math.floor(this.player.getDuration() / 60)}:${Math.floor(this.player.getDuration() % 60)}`
    setQueue({...queue})
  }

  loadAndPlay() {
    const [ currentVideo ] = this.context;
    this.player.cueVideoById({videoId: currentVideo.videoId});
  }
}

export default YTPlayer;