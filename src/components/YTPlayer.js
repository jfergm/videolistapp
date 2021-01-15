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
    const { setCurrentVideo } = this.context;
    const {queue, setCurrentIndex, setEnded} = this.props.queueContext;
    let videoId = null;
    if(queue.queue.length ) {
      setCurrentIndex(0);
      setEnded(false);
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
    const {currentVideo, setCurrentVideo} = this.context;
    const { queue, setCurrentIndex, setEnded } = this.props.queueContext;
    if(queue.ended && ((queue.currentIndex === null && queue.queue.length === 1) || queue.currentIndex < queue.queue.length - 1)) {
      setCurrentIndex(queue.queue.length - 1);
      setEnded(false);
      setCurrentVideo({...queue.queue[queue.queue.length - 1]});
    }

    if(currentVideo.data.hasOwnProperty('videoId')) {
      if(currentVideo.data.hasOwnProperty('playing') && this.player.hasOwnProperty('playVideo')) {
        if(currentVideo.data.playing && !queue.ended) {
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
    const {currentVideo, setCurrentVideo, setPlaying} = this.context;
    const { queue, setCurrentIndex, setEnded } = this.props.queueContext;
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        setPlaying(true)
        if(this.player.getCurrentTime() < 1) {
          if(!currentVideo.data.hasOwnProperty('title') || !currentVideo.data.hasOwnProperty('duration')) {
            this.updateItemInfo();
          }
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        setPlaying(false)
        break;
      case window['YT'].PlayerState.ENDED:        
        
        if(queue.currentIndex < queue.queue.length - 1) {
          setCurrentIndex(queue.currentIndex + 1)
          setCurrentVideo({...queue.queue[queue.currentIndex + 1]})
        } else if(queue.currentIndex === queue.queue.length - 1) {
          setEnded(true)
          setCurrentVideo(false)
        }
        break;
      case window['YT'].PlayerState.CUED:
        this.player.playVideo();
        break;
      default:

    };
  };

  updateItemInfo() {
    const { setCurrentVideoInfo } = this.props.queueContext;
    const videoData = this.player.getVideoData();
    setCurrentVideoInfo(videoData, this.player.getDuration())
  }

  loadAndPlay() {
    const { currentVideo } = this.context;
    this.player.cueVideoById({videoId: currentVideo.data.videoId});
  }
}

export default YTPlayer;