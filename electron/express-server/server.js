const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors())

const PORT = process.env.PORT || 4000;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});

const io = socketio(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  console.log("connected xd")
  io.emit('message', 'EGEbv7syF7M')
});