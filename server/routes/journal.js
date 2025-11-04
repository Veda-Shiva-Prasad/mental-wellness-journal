const express = require("express");
const router = express.Router();
const Journal = require("../models/journal");

// Add a new journal entry
router.post("/", async (req, res) => {
  try {
    const { mood, entry } = req.body;
    const newEntry = new Journal({ mood, entry });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT/EDIT
router.put("/:id", async (req, res) => {
  try {
    const { mood, entry } = req.body;
    const updated = await Journal.findByIdAndUpdate(
      req.params.id,
      { mood, entry },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all journal entries
router.get("/", async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
