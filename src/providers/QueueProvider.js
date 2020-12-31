import { useState, createContext, useContext, useEffect, Component } from 'react';

import { SocketContext } from './SocketProvider';

const QueueContext = createContext();

class QueueProvider extends Component {
  static contextType =  SocketContext;

  constructor(props) {
    super(props)
    this.state = {
      queue: [{
        videoId: 'i1-y2sWp6Y8'
      }],
      currentIndex: null,
      ended: true
    }
  }

  addToList(videoId) {
    this.setState({
      queue: this.state.queue.concat([{videoId}])
    });
  }

  removeFromList(removeIndex) {
    const queue = this.state.queue.reduce((acc, curr, index) => {
      if(index !== removeIndex) {
        acc.push(curr);
      }
      return acc;
    }, []);
    this.setState({
      queue
    });
  }

  setCurrentIndex(currentIndex) {
    this.setState({
      currentIndex
    });
  }

  setEnded(ended) {
    this.setState({
      ended 
    });
  }

  setCurrentVideoInfo(info, duration) {
    const queue = [...this.state.queue]
    const item = this.state.queue[this.state.currentIndex];
    item.title = info.title;
    item.duration = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`

    this.setState({
      queue
    })
  }

  componentDidMount() {
    const [socket] = this.context;
    socket.on('message', message => {
      console.log(message)
    });

    socket.on('start-queue', queue => {
      this.setState(queue)
    });

    socket.on('sendVideoIdToPlayer', videoId => {
      this.addToList(videoId);
    })
  }

  componentDidUpdate() {
    console.log(this.state)
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