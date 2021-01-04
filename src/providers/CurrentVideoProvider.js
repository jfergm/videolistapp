import { createContext, Component } from 'react'
import { QueueContext } from './QueueProvider';

export const CurrentVideoContext = createContext();

export class CurrentVideoProvider extends Component {
  static contextType = QueueContext;
  constructor(props) {
    super(props);
    this.state = {
      data: {

      }
    }
  }

  setITem(index) {
    const { queue, setCurrentIndex } = this.context;
    this.setCurrentVideo({...queue.queue[index]});
    setCurrentIndex(index);
  }

  componentDidMount() {
    const socket = this.props.socket;

    socket.on('set-item', index => {
      this.setITem(index);
    })
  }

  setCurrentVideo(video) {
    this.setState( {data: {...video}} )
  }

  setPlaying(playing) {
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          playing
        }
      }
    })
  }

  render() {
    return(
      <CurrentVideoContext.Provider value={{
        currentVideo: this.state,
        setCurrentVideo: this.setCurrentVideo.bind(this),
        setPlaying: this.setPlaying.bind(this)
      }}>
        { this.props.children }
      </CurrentVideoContext.Provider>
    )
  }
}