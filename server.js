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
  temp = new user();
  temp.room = "";
  temp.socket = socket;
  
  activeUsers.push(temp);

  console.log("User connected " + temp.inGame);

  socket.on("disconnect", (msg) => {
    // Remove user from active users on discconect
    activeUsers.splice(activeUsers.indexOf(temp, activeUsers.indexOf(temp)));
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

class chat {
  id;
  messages = [];
}

class user {
  room;
  socket;
  inGame = false;
}

function findGame(socket) {
  activeUsers.forEach(element => {
    if (element.socket.id != socket.id){
      if (element.inGame = false){
        socket.join('room 1')
        element.socket.join('room 1')
        element.inGame = true
        return true;
      }else {
        return false
      }
    }else {
      return false
    }

  });
  return false
}

activeUsers = [];

var chats = [];
