const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const cors = require("cors");
require("dotenv").config();

require("./db/conn")
const UserRouter = require("./routes/User");
const ConversationRouter = require("./routes/conversation");
const MessageRouter = require("./routes/messages");


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

app.listen(port,()=>{
    console.log("server listion on port : ",port);
})