const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const session = require("express-session");
const multer = require("multer");
const FormData = require("form-data");
const { PassThrough } = require("stream");
const PDF = require("./models/PDF");
const path = require("path");

dotenv.config();
const app = express();

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// ✅ CORS (IMPORTANT: credentials & origin for frontend)
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    credentials: true, // allow cookies
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true if using https
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// ✅ File Upload Memory Storage
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Routes
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const pdfRoutes = require("./routes/pdf");
const leaderboardRoutes = require("./routes/leaderboard");

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/pdf", pdfRoutes);
app.use("/leaderboard", leaderboardRoutes);

// ✅ PDF Upload + AI Microservice Forwarding
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
      `http://${process.env.PYTHON_SERVICE_HOST}:5001/generate/`,
      form,
      {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    // ✅ Save PDF summary + MCQs to DB
    const newPdf = new PDF({
      file_path: "",
      filename: req.file.originalname,
      summary: data.summary,
      questions: data.mcqs || data.questions,
      user_id: req.session.user?._id || null,
      createdAt: new Date(),
    });

    const savedPdf = await newPdf.save();
    res.status(200).json(savedPdf);
  } catch (err) {
    console.error("❌ AI microservice error:", err.message);
    res.status(500).json({ error: "Processing failed." });
  }
});

// ✅ Server Start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
