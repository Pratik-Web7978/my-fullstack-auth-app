// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Your User model
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Signup route
// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: 'User already exists' });

//     // Create new user with hashed password
//     user = new User({ email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     res.json({ msg: 'User created successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user
//     let user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     // Create JWT token
//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 3600 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Login attempt:", email);

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // 2. Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
     console.log("🔍 Password match:", isMatch); 
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // ✅ Success
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

module.exports = router;