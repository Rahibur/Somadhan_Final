const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const loginModel = require('../models/loginModel');
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send('User Not Found');
        }
        const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: 86400 }); // 24 hours
        res.status(200).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
});

router.post('/reguser', async (req, res) => {
    try {
        const newUser = new loginModel(req.body);
        await newUser.save();
        res.status(201).json({
            success: true,
            newUser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
});

router.post('/register', authMiddleware, async (req, res) => {
    const { name, email, age, mobile, work, address, desc, linkedin, other, skills, experience, edu } = req.body;
    if (!name || !email || !age || !mobile || !work || !address || !desc || !linkedin || !other || !skills || !experience || !edu) {
        return res.status(422).json({ error: "Please fill all fields properly" });
    }

    try {
        const preuser = await User.findOne({ email: email });
        if (preuser) {
            return res.status(422).json({ error: "Email already exists" });
        } else {
            const user = new User({ userId: req.userId, name, email, age, mobile, work, address, desc, linkedin, other, skills, experience, edu });
            await user.save();
            res.status(201).json(user);
        }
    } catch (err) {
        res.status(422).json(err);
    }
});

router.get("/getdata", authMiddleware, async (req, res) => {
    try {
        const userdata = await User.find({ userId: req.userId });
        res.status(200).json(userdata);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.get("/getuser/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userindividual = await User.findOne({ _id: id, userId: req.userId });
        if (!userindividual) return res.status(404).json({ message: 'User not found or unauthorized' });
        res.status(200).json(userindividual);
    } catch (err) {
        res.status(422).json(err);
    }
});

router.patch("/updateuser/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updateuser = await User.findOneAndUpdate({ _id: id, userId: req.userId }, req.body, { new: true });
        if (!updateuser) return res.status(404).json({ message: 'User not found or unauthorized' });
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(422).json(error);
    }
});

router.delete("/deleteuser/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteuser = await User.findOneAndDelete({ _id: id, userId: req.userId });
        if (!deleteuser) return res.status(404).json({ message: 'User not found or unauthorized' });
        res.status(200).json(deleteuser);
    } catch (error) {
        res.status(422).json(error);
    }
});

router.use(bodyParser.json());
router.use(cors());
router.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: prompt,
    });

    res.send(completion.data.choices[0].text);
});

module.exports = router;
