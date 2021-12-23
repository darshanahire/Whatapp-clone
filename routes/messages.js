const router = require("express").Router();
const Message = require("../models/Message");

// add massages

router.post("/messages", async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(500).json(err);
    }
})

// get massages

router.post("/getMessages", async(req,res)=>{ 
try{
    await Message.find({conversationId : req.body.payload}).then((data)=>{
        res.status(200).json(data)
    })
}catch(err){
    res.status(500).json(err)
}
})

module.exports =  router;