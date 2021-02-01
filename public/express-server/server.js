const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const path = require("path");
const os = require('os');

const app = express();

app.use(cors());
app.use('/static', express.static(path.join(__dirname, "../../build")));

const PORT = process.env.PORT || 4000;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

const io = socketio(httpServer, {
  cors: {
    origin: "*"
  }
});

let adminKey= null;

io.on('connection', (socket) => {

  socket.on('getServerIpAddress', () => {
    const serverIpAddress = getIpAddress();
    socket.emit('serverIPAddress', serverIpAddress)
  });

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

  socket.on('select-item', item => {
    io.emit('set-item', item.index)
  });

  socket.on('adminKey-changed', newKey => {
    adminKey = newKey;
    io.emit('adminKey-updated', adminKey);
  });

  socket.on('check-AdminKey', key => {
    let adminKeyMatch = (adminKey && key && (key === adminKey)) ? true : false;
    socket.emit('adminKey-checked', adminKeyMatch);
  })

});

const getIpAddress = () => {
  const ninterfaces = os.networkInterfaces();
  const noInternalsIPV4 = [];
  for(interface in ninterfaces) {
    if(interface.indexOf('VirtualBox') >=0) {
      continue;
    }
    ninterfaces[interface].map((i) => {
      if(!i.internal && i.family === 'IPv4') {
        noInternalsIPV4.push(i)
      }
    })
    
  }
  return noInternalsIPV4[0].address
}