import { useState, createContext, useContext, useEffect, Component } from 'react';

import { SocketContext } from './SocketProvider';

const QueueContext = createContext();

class QueueProvider extends Component {
  static contextType =  SocketContext;

  constructor(props) {
    super(props)
    this.state = {
      queue: [],
      currentIndex: null,
      ended: true
    }
  }

  addToList(videoId) {
    const [socket] = this.context;
    const queue = this.state.queue.concat([{videoId}]);
    this.setState({
      queue
    });

    socket.emit('queue-changes', {
      type: 'addToList',
      payload: queue
    })
  }

  removeFromList(removeIndex) {
    const[ socket ] = this.context;
    const queue = this.state.queue.reduce((acc, curr, index) => {
      if(index !== removeIndex) {
        acc.push(curr);
      }
      return acc;
    }, []);
    this.setState({
      queue
    });

    socket.emit('queue-changes', {
      type: 'removeFromList',
      payload: queue
    })
  }

  setCurrentIndex(currentIndex) {
    const [ socket ] = this.context;
    this.setState({
      currentIndex
    });

    socket.emit('queue-changes', {
      type: 'currentIndex',
      payload: currentIndex
    })
  }

  setEnded(ended) {
    const [ socket ] = this.context;
    this.setState({
      ended 
    });

    socket.emit('queue-changes', {
      type: 'ended',
      payload: ended
    });
  }

  setCurrentVideoInfo(info, duration) {
    const [ socket ] = this.context;
    const queue = [...this.state.queue]
    const item = this.state.queue[this.state.currentIndex];
    item.title = info.title;
    item.duration = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`

    this.setState({
      queue
    })

    socket.emit('queue-changes', {
      type: 'currentVideoInfo',
      payload: queue
    });
  }

  componentDidMount() {
    const [socket] = this.context;
    socket.on('message', message => {
    });

    socket.on('send-vide-to-player', videoId => {
      this.addToList(videoId);
    })

    socket.on('get-queue', () => {
      console.log('get-queu')
      socket.emit('send-queue', this.state)
    })
  }

  componentDidUpdate() {

  }


  render() {
    return (
      <QueueContext.Provider value={{
        queue: this.state,
        addToList: this.addToList.bind(this),
        removeFromList: this.removeFromList.bind(this),
        setEnded: this.setEnded.bind(this),
        setCurrentIndex: this.setCurrentIndex.bind(this),
        setCurrentVideoInfo: this.setCurrentVideoInfo.bind(this)
      }}>
        { this.props.children }
      </QueueContext.Provider>
    )
  }
}

export {
  QueueContext,
  QueueProvider
}