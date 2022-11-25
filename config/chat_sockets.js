module.exports.chatSockets=function(socketServer){
    // io is handdeling the connection
    // let io=require('socket.io')(socketServer);
    let io=require('socket.io')(socketServer,{
        cors:{
            origin:"http://loclahost:5000",
            methods:["GET","POST"],
            credentials:true
        }
    });
    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnetced');
        });

        socket.on('join_room',function(data){
            console.log('joining request',data);
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

       
    });

}