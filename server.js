const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");

const cookieParser = require("cookie-parser")
app.use(cors());
app.use(cookieParser());
app.use(express.json());







const port = process.env.PORT || 5000;

require("dotenv").config();
require("./db/conn")


const UserRouter = require("./routes/User");
const ConversationRouter = require("./routes/conversation");
const MessageRouter = require("./routes/messages");

const server = http.createServer(app);

let users = [];

const getUser =(userId)=>{
    return users.find((user)=>user.userId === userId)
}
const adduser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
}
const Removeuser = (socketId) => {
    users=users.filter(user => user.socketId !== socketId);
}

const io = socketio(server, {
    cors: {
        origins: ["http://localhost:8080"],
    }
})

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on('adduser', (userId) => {
        adduser(userId,socket.id);
        io.emit('getusers',users)
        
    })
// console.log(users);

    // send and get msg

    socket.on("sendMessage",({senderId,receiverId,text,conversationId})=>{         
        const payload={
            conversationId,
            sender:senderId,
            text
        }
        const user = getUser(receiverId);
        if(user){   
        const friendsId=user.socketId;        
        io.to(friendsId).emit("getMessage",{
            conversationId,
        senderId,
        text
        })}
        else{
            console.log("user not found in user array");
            
        }
    })
    socket.on("typing", (payload) => {        
        const user = getUser(payload.receiverId);
        if(user){
        const friendsId=user.socketId;  
        io.to(friendsId).emit("sendertyping",payload)};
    })
    socket.on('disconnect', function() {
        Removeuser(socket.id)
        console.log('user disconnected.');
    });

})

app.use(UserRouter, ConversationRouter);
app.use(MessageRouter)

app.use(express.static("client/dist"));
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

server.listen(port, () => {
    console.log("server listion on port : ", port);
})