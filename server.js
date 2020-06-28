const io = require('socket.io')(3000);
 const users = {};
io.on("connection", (socket)=>{
    socket.on("new-user", (name) =>{
        users[socket.id] = name;
        socket.broadcast.emit("user-connected", name);
    });
    socket.on("scm", (message)=>{
        socket.broadcast.emit("msg",{message: message, name: users[socket.id]});
    });
socket.on("disconnect", ()=>{
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
})
})
