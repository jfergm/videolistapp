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
    const adminKey = window.localStorage.getItem('adminKey');
    socket.emit("adminKey-changed", adminKey);
    socket.on('serverIPAddress', ipAddress => {
      serverIpAddress = ipAddress;
      this.setState({
        socket,
        serverIpAddress,
        adminKey
      });
    });
  }

  setAdminKey(adminKey) {
    this.setState({
      adminKey
    });
    window.localStorage.setItem('adminKey', adminKey);
    this.state.socket.emit("adminKey-changed", adminKey);
  }

  render() {

    if(this.state.socket) {
      return (
        <SocketContext.Provider value={{
            socket: this.state.socket, 
            serverIpAddress: this.state.serverIpAddress,
            adminKey: this.state.adminKey,
            setAdminKey: this.setAdminKey.bind(this)
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
