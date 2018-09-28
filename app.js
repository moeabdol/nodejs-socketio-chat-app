const express = require('express');
const path    = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

const server = app.listen(3000, err => {
  if (err) return console.log(err);
  console.log('Server listening on port 3000');
});

const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('on connection', socket.id);

  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });
});
