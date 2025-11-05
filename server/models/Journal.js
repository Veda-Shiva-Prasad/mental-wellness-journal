const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  entry: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // mood: { type: String }, // Optional
});

module.exports = mongoose.model("Journal", JournalSchema);
