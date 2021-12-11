const mongoose = require("mongoose");

const User = new mongoose.Schema(
   {
       name :{
           type : String,
       },
       email :{
           type : String,
           unique : true
       },
       password :{
           type : String,
           minlength : 4
       }
   }
);

module.exports = User;