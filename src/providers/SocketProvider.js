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
    let serverIpAddress;
    socket.emit('getServerIpAddress');
    socket.on('serverIPAddress', ipAddress => {
      serverIpAddress = ipAddress;
      this.setState({
        socket,
        serverIpAddress
      });
    });
  }

  render() {

    if(this.state.socket) {
      return (
        <SocketContext.Provider value={{
            socket: this.state.socket, 
            serverIpAddress: this.state.serverIpAddress,
            adminKey: this.state.adminKey
          }}
          >
          { this.props.children }
        </SocketContext.Provider>
      );
    } else {
      return (<div>loading</div>)
    }

  }

}
