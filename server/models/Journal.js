const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    required: true,
  },
  entry: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Journal", journalSchema);
