const router = require("express").Router();
const User = require("../models/User");

router.post('/signup', async (req, res) => {
    let userData = req.body;
    try {
        await User.create(userData).then((data) => {
            res.status(200).json(data);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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