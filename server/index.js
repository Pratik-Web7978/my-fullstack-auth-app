require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User"); // Adjust if file structure differs
const connectDB = require("./config/db");
connectDB(); // This must be present!

const app = express(); // ⬅️ THIS WAS MISSING

// Middleware
app.use(express.json());
app.use(cors());

// // ✅ Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/myapp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📥 Signup request:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

    const newUser = new User({ email, password });
    await newUser.save();

    console.log("✅ User created:", newUser);
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
