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
  socket.on('init-queue', () => {
    console.log('init queue')
    io.emit('get-queue');
  });

  socket.on('queue-changes', data => {
    io.emit('queue-changed', data)
  });

  socket.on('send-queue', queue => {
    io.emit('start-queue', queue);
  });

  socket.on('send-video-id', link => {
    io.emit('send-vide-to-player', link)
  });

  socket.on('delete-item', item => {
    io.emit('send-delete-item', item.index)
  });
});

