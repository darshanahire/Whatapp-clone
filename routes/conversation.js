const { Router } = require("express");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const router = Router();

// add conversation
router.post('/conversations', async (req, res) => {
    let sender = req.body.senderId;
    let receiver = req.body.receiverId;
    try {
        await User.findOneAndUpdate({ _id: sender }, { $addToSet: { friends: receiver } });
    } catch (err) {
        console.log(err);
    }
    await Conversation.findOne({ $and: [{ members: { $in: [receiver] } }, { members: { $in: [sender] } }] }).then(async (data) => {
        if (data) {
            res.status(200).json(data);
        }
        else {
            const newConversation = new Conversation({
                members: [sender, receiver]
            });
            try {

                const Conversation = await newConversation.save();
                res.status(200).json(Conversation);
            } catch (err) {
                res.status(500).json(err);
            }
        }

    }).catch((err) => {
        res.status(500).json(err)
    })
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

// get conversationId for usersList lastseen and messagess
router.get('/conversationsId', async (req, res) => {
    const { sender, receiver } = req.body;
    try {
        await Conversation.findOne({ sender, receiver }).then((data) => {
            res.status(200).json(data);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.post('/getfriends', async (req, res) => {
    const { _id } = req.body;
    try {
        await Conversation.find({ "members.0": _id }).then((data) => {
            res.status(200).json(data);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;