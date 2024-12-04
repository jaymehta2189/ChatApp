const express=require("express");
const app=express();
const path=require("path");
const port=process.env.PORT||4000;
const server=app.listen(port,()=>console.log("listening"));
app.use(express.static(path.join(__dirname,"public")));

const io=require('socket.io')(server);
io.on('connection',onconnected);
const socketconnected=new Set();
function onconnected(socket){
    console.log(socket.id);
    socketconnected.add(socket.id);
    io.emit("tc",socketconnected.size);

    socket.on("disconnect",()=>{
        console.log("disc"+socket.id);
        socketconnected.delete(socket.id);
        io.emit("tc",socketconnected.size);
    })
    socket.on("message",(data)=>{
        socket.broadcast.emit("chatmessage",data);
    })
    socket.on("feedback",(data)=>{
        socket.broadcast.emit("feedbackto",data);
    })
}

