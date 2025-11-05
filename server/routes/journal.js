const express = require("express");
const jwt = require("jsonwebtoken");
const Journal = require("../models/journal");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key"; // Or use process.env.JWT_SECRET in production

// JWT auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Add a new journal entry (POST /api/journals)
router.post("/", auth, async (req, res) => {
  try {
    const { entry } = req.body;
    if (!entry || !entry.trim()) {
      return res.status(400).json({ error: "Entry cannot be empty." });
    }
    const newEntry = new Journal({
      entry,
      userId: req.user.userId, // from JWT!
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all journal entries for this user (GET /api/journals)
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.userId }).sort({
      date: -1,
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a journal entry (PUT /api/journals/:id)
router.put("/:id", auth, async (req, res) => {
  try {
    const { entry } = req.body;
    const updated = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { entry },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a journal entry (DELETE /api/journals/:id)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
