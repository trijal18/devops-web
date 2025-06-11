const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const session = require("express-session");
const multer = require("multer");
const FormData = require("form-data");
const { PassThrough } = require("stream");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

const upload = multer({ storage: multer.memoryStorage() });

const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const pdfRoutes = require("./routes/pdf");
const leaderboardRoutes = require("./routes/leaderboard");

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/pdf", pdfRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.post("/api/generate", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const stream = new PassThrough();
    stream.end(req.file.buffer);

    const form = new FormData();
    form.append("file", stream, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      knownLength: req.file.size,
    });

    const { data } = await axios.post(
      `${process.env.PYTHON_SERVICE_URL}/generate/`,
      form,
      {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    res.json(data);
  } catch (err) {
    console.error("AI microservice error:", err.message);
    res.status(500).json({ error: "Processing failed." });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
