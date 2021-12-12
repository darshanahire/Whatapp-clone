const { Router } = require("express");
const Conversation = require("../models/Conversation");
const router = Router();

// add conversation
router.post('/conversations', async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
})


// get conversation
router.get('/conversations/:userId', async (req, res) => {
    try {
        await Conversation.find({ members: { $in: req.params.userId } }).then((data) => {
            res.status(200).json(data);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;