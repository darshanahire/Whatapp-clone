const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGO_URI;
// const uri = 

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((data) => {
    console.log("DB is Connected..")
}).catch((err) => {
    console.log(err);
})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected successfully");
    
})