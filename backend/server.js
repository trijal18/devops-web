// backend/server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mcqapp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Load quiz model here or define schema inline if needed

app.post("/api/generate", upload.single("pdf"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const base64PDF = fileBuffer.toString("base64");

    const { data } = await axios.post(`${process.env.PYTHON_SERVICE_URL}/process`, {
      file: base64PDF
    });

    // Store to DB if needed here
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Processing failed." });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
