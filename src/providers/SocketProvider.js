import { createContext, Component } from 'react';
import { connect } from '../socketio/socketio';


export const SocketContext = createContext();

export class SocketProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    let socket = await connect();
    this.setState({
      socket
    })
  }

  render() {

    if(this.state.socket) {
      return (
        <SocketContext.Provider value={[this.state.socket]}>
          { this.props.children }
        </SocketContext.Provider>
      );
    } else {
      return (<div>loading</div>)
    }

  }

}
