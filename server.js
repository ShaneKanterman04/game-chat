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
  temp = new user();
  temp.room = "";
  temp.socket = socket;
  
  activeUsers.push(temp);

  console.log("User connected " + temp.inGame);
  
  socket.on("disconnect", (msg) => {
    // Remove user from active users on discconect
    activeUsers.splice(activeUsers.indexOf(temp, activeUsers.indexOf(temp)));
  });

  socket.on("chat message", (msg, room) => {
    io.to(room).emit("chat message", msg, room);
    console.log(room)
  });

  socket.on("join room", (room) => {
    
    socket.join(room)
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


activeUsers = [];

var chats = [];
