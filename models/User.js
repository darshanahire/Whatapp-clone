const mongoose = require("mongoose");

const User = new mongoose.Schema(
   {
       name :{
           type : String,
       },
       dp:{
           type:String,
       },
       about :{
           type : String
       },
       lastSeen :{
           type : Date
       },
       email :{
           type : String,
           unique : true
       },
       password :{
           type : String,
           minlength : 4
       },
       friends:{
           type : Array,
       }
   }
);

module.exports = mongoose.model("User",User);