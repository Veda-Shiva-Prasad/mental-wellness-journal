const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
// const JWT_SECRET = "your_jwt_secret_key"; // Use dotenv in production!
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Signup (returns the JWT token like login)
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ error: "User already exists" });
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  // --- Return a JWT token for the new user ---
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Login (no change)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "User not found" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Invalid password" });
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected route example
router.get("/me", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });
  const token = auth.split(" ")[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(data.userId).select("-password");
    res.json(user);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
