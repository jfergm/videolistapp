import io from 'socket.io-client';

const connect = async () => {
  return await io('http://localhost:4000');
}


export {
  connect
}