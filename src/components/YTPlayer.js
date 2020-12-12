import { Component } from 'react';

import { CurrentVideoContext } from '../providers/CurrentVideoProvider';

const YTPlayerStyle = {
  width: '95%',
  height: '100%'
}

class YTPlayer extends Component {
  static contextType = CurrentVideoContext;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const [currentVideo, setCurrentVideo] = this.context
    this.player = new window['YT'].Player('YTPlayer', {
      videoId: currentVideo.videoId,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onReady': (e) => {
          e.target.playVideo();
          setCurrentVideo({...currentVideo, playing: true});
        }
      }
    });
  }

  componentDidUpdate() {
    const [currentVideo] = this.context;

    if(currentVideo.playing) {
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  }

  render() {
    return (
      <div id="YTPlayer" style={YTPlayerStyle}></div>
    );
  }

  onPlayerStateChange(event) {
    const[currentVideo, setCurrentVideo] = this.context;
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        setCurrentVideo({...currentVideo, playing: true})
        break;
      case window['YT'].PlayerState.PAUSED:
        setCurrentVideo({...currentVideo, playing: false})
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        setCurrentVideo({...currentVideo, playing: false})
        break;
    };
  };
}

export default YTPlayer;