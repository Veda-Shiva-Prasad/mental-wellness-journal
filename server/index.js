const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "https://mental-wellness-journal-rouge.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Load routes BEFORE MongoDB connects
const journalRoutes = require("./routes/journal");
const authRoutes = require("./routes/auth");

app.use("/api/journals", journalRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Mental Wellness Journal API running!");
});

// MongoDB Connection (async, doesn't block routes)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
