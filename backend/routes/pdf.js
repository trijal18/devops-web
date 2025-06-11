// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const PDF = require('../models/PDF');
// const { requireLogin } = require('../utils/auth');
// const axios = require('axios');
// const router = express.Router();

// router.post('/upload', requireLogin, async (req, res) => {
//   const file = req.files.file;
//   if (!file.mimetype.includes('pdf')) return res.status(400).json({ error: 'Only PDFs allowed' });

//   const filename = `${Date.now()}-${file.name}`;
//   const filePath = path.join(__dirname, '../uploads', filename);
//   await file.mv(filePath);

//   try {
//     const { data } = await axios.post(process.env.PYTHON_SERVICE_URL, { file_path: filePath });
//     const pdf = await PDF.create({
//       file_path: filePath,
//       filename,
//       summary: data.summary,
//       questions: data.questions,
//       user_id: req.session.userId,
//     });
//     res.json({ pdf_id: pdf._id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Quiz generation failed' });
//   }
// });

// router.get('/summary/:id', requireLogin, async (req, res) => {
//   const pdf = await PDF.findById(req.params.id);
//   if (!pdf) return res.status(404).json({ error: 'Not found' });
//   res.json({ summary: pdf.summary, questions: pdf.questions.length });
// });

// module.exports = router;

// backend/routes/pdf.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const PDF = require('../models/PDF');
const { requireLogin } = require('../utils/auth');
const router = express.Router();

// File upload route
router.post('/upload', requireLogin, async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!file.mimetype.includes('pdf')) {
      return res.status(400).json({ error: 'Only PDF files allowed' });
    }

    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(__dirname, '../uploads', filename);

    // Save file to disk
    await file.mv(filePath);

    // Call Python microservice
    const { data } = await axios.post(`${process.env.PYTHON_SERVICE_URL}/generate`, {
      file_path: filePath,
    });

    // Save PDF metadata to MongoDB
    const pdf = await PDF.create({
      file_path: filePath,
      filename,
      summary: data.summary,
      questions: data.questions || data.mcqs,
      user_id: req.session.userId,
    });

    res.status(200).json({ pdf_id: pdf._id });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Quiz generation failed' });
  }
});

// Summary route (for SummaryPage)
router.get('/summary/:id', requireLogin, async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) return res.status(404).json({ error: 'PDF not found' });

    res.json({ summary: pdf.summary, questions: pdf.questions.length });
  } catch (err) {
    console.error('Summary fetch error:', err);
    res.status(500).json({ error: 'Failed to load summary' });
  }
});

// Optional: Full PDF details route (for fallback use)
router.get('/:id', requireLogin, async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) return res.status(404).json({ error: 'PDF not found' });

    res.json(pdf); // Returns full object
  } catch (err) {
    console.error('Fetch PDF error:', err);
    res.status(500).json({ error: 'Failed to fetch PDF' });
  }
});

module.exports = router;
