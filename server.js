const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile('src/index.html', { root: __dirname });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', (msg) => {
      console.log('user disconnected');
    });
    console.log(socket.id);
    socket.to(socket.id).emit('test');

  socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      
      console.log('message: ' + msg);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

class chat {
    id;
    messages = [];
}



var devChat = new chat(0,["test message 1"])

var chats = []
