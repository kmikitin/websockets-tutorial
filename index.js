let express = require('express');
let socket = require('socket.io');

// APP SETUP
let app = express()
let server = app.listen(4000, function(){
    console.log('Listening to requests on port 4000.')
});

// STATIC FILES
app.use(express.static('public'))

// SOCKET SETUP
let io = socket(server);

io.on('connection', function(socket){
    console.log('Make socket connection.', socket.id);
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});

