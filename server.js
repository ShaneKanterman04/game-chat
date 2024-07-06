const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile("src/index.html", { root: __dirname });
});

io.on("connection", (socket) => {
  // Create the temporary user class to add to array

  
  socket.on("disconnect", (msg) => {
    // Remove user from active users on discconect
    //activeUsers.splice(activeUsers.indexOf(temp, activeUsers.indexOf(temp)));
  });

  socket.on("chat message", (msg, room) => {
    io.to(room).emit("chat message", formatMessage(socket.id, msg, room));
    console.log("Message: " + msg + ' to room ' + room)

    console.log(formatMessage(socket.id, msg, room));
  });

  socket.on("join room", (room) => {
    createChat(socket, room);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});


// Chat Manager

function createChat(socket, room) {
  if(checkChatExists(room)) {

  }else {
    var temp = new Chat();
    temp.roomName = room;
    temp.usersConnected++;
    chats.push(temp);
  }
  
  socket.join(room)
}

function checkChatExists(room) {
  for (var i = 0; i < chats.length; i++) {
    if (chats[i].roomName == room) {
      return true;
    }
  }
  return false;
}

function formatMessage(user, message, room) {
  var temp = new Message();
  temp.user = user;
  temp.message = message;
  temp.room = room;

  return temp;
}

class Message {
  user;
  message;
  room;
}

class Chat {
  roomName;
  messages = [];
  usersConnected = 0;
}

chats = [];