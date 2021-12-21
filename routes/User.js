const router = require("express").Router();
const User = require("../models/User");

router.get('/getAllUsers', async (req, res) => {
    try {
        await User.find().then((data) => {
            res.status(200).json(data);
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.post('/signup', async (req, res) => {
    let userData = req.body;
    try {
        await User.create(userData).then((data) => {
            res.status(200).json(data);
        })
    } catch (err) {
        if (err.code == 11000) {
            res.status(500).json("Email is Allready register");
        }
        else {
            res.status(500).json(err);
        }
    }
})


router.post('/getUser', async (req, res) => {
    // const id  = req.body.id;
    console.log(req.body);
    
    // try {
    //     await User.findOne({ _id }).then((data) => {
    //         res.status(200).json(data);
    //     })
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json(err);

    // }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await User.findOne({ email, password }).then((data) => {
            if (data !== null && data.password === password) {
                res.status(200).json(data);
            }
            else {
                res.status(401).send("Check Password or Signup First");
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
})


module.exports = router;