const mongoose = require("mongoose");

const User = new mongoose.Schema(
   {
       name :{
           type : String,
       },
       about :{
           type : String
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