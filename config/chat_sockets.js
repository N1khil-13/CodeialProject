

// module.exports.chatSockets = function (socketServer) {

//     // app.use(cors());

//     // Set up Socket.io with CORS support
//     // const server = require('http').createServer(app);


//     let io = require('socket.io')(socketServer, {
//         cors: {
//             origin: 'http://localhost:8000',
//             methods: ['GET', 'POST']
//         }
//     });

//     io.on('connection', function (socket) {
//         console.log('New connection recieved', socket.id);

//         socket.on('disconnect', function () {
//             console.log('Socket disconnected');
//             return;
//         });

//         socket.on('join_room', function (data) {
//             console.log('Joining req rec', data);

//             socket.join(data.chatroom);

//             io.in(data.chatroom).emit('user_joined', data);
//         });

//         // detect send-message and broadcast message to everyone 

//         socket.on('send_message', function (data) {
//             io.in(data.chatroom).exit('receive_message', data);
//         });

//     });






// }
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });

    });

}