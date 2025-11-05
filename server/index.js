const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Import your route files ---
const journalRoutes = require("./routes/journal");
const authRoutes = require("./routes/auth");

// --- Connect your route files here ---
app.use("/api/journals", journalRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Mental Wellness Journal API running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
