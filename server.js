const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const cors = require("cors");
const socketio = require("socket.io");
require("dotenv").config();

require("./db/conn")
const UserRouter = require("./routes/User");
const ConversationRouter = require("./routes/conversation");
const MessageRouter = require("./routes/messages");


// const http = require("http");
// const server = http.createServer(app);
const Message = require("./models/Message");

const io = socketio(8900, {
    cors: {
        origins: ["http://localhost:8080"]
    }
})
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

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on('adduser', (userId) => {
        adduser(userId,socket.id);
        // io.emit('getusers',users)
        // console.log(users);
        
    })

    // send and get msg

    socket.on("sendMessage",({senderId,receiverId,text,conversationId})=>{
        const payload={
            conversationId,
            sender:senderId,
            text
        }
        const user = getUser(receiverId);
        if(user){
        console.log(text);    
        const friendsId=user.socketId;        
        io.to(friendsId).emit("getMessage",{
        senderId,
        text
        })}
        else{
            console.log("user not found in user array");
            
        }
    })
    socket.on('disconnect', function() {
        Removeuser(socket.id)
        console.log('user disconnected.');
    });

})


const cookieParser = require("cookie-parser")
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(UserRouter, ConversationRouter);
app.use(MessageRouter)


app.use(express.static("client/dist"));
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.listen(port, () => {
    console.log("server listion on port : ", port);
})