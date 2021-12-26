const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
    // options ..
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.broadcast.emit("welcome to join as :)") // send a message to everyone "except for a certain emitting socket"

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' , msg}); // This will emit the event to all connected sockets


    });


});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});