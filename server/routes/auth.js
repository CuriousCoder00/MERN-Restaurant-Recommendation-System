const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

dotenv.config();

// @route   POST api/auth/register : To register new user.
router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Find the user if they already exists by their username
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(400).json({ error: "username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new User({name: name, username: username, password: hashedPassword})
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

// @route   POST api/auth/login : To login user.
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by their email
        let foundUser = await User.findOne({username});
        if (!foundUser) {
            res.status(400).json({ error: 'Invalid credentials.' });
        }
        // Compare the password
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials.' });
        }
        // Create a token
        const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).json({ foundUser, token });
    } catch (error) {
        res.status(500).send('Internal server error.');
    }
});

module.exports = router;
