const express = require('express');
const app = express();
const {join} = require('path');
const {Server} = require('socket.io');
const http = require('node:http');


const server = http.createServer(app);
const io = new Server(server);


app.get('/',(req,res) => {
  res.sendFile(join(__dirname, 'index.html'));
})

io.on('connection', (socket) => {
  console.log(`a user connected with ${socket.id}`);
  // socket.on('disconnect', () => {
  //   console.log('user disconnected');
  // });
  socket.on('chat message', (msg) => {
    // console.log('message: ' + msg);
    io.emit('message for all' , msg);
  }); 

  socket.on('typing' , ()=> {
    socket.broadcast.emit('show_typing_status')
  });

  socket.on('stop_typing' , ()=> {
    socket.broadcast.emit('hide_typing_status')
  });

}); 


server.listen( 3100,()=>{
  console.log("Application run on port 3100");
})