const express = require('express');
const PDF = require('../models/PDF');
const Score = require('../models/Score');
const { requireLogin } = require('../utils/auth');
const router = express.Router();

router.get('/:pdf_id', requireLogin, async (req, res) => {
  const pdf = await PDF.findById(req.params.pdf_id);
  if (!pdf) return res.status(404).json({ error: 'PDF not found' });
  res.json({ questions: pdf.questions });
});

router.post('/answer', requireLogin, async (req, res) => {
  const { pdf_id, index, selected_option } = req.body;
  const pdf = await PDF.findById(pdf_id);
  const q = pdf.questions[index];
  const correct = q.answer.trim() === selected_option.trim();

  let scoreDoc = await Score.findOne({ pdf_id, user_id: req.session.userId });
  if (!scoreDoc) scoreDoc = await Score.create({ pdf_id, user_id: req.session.userId, score: 0 });

  if (correct) {
    scoreDoc.score += 1;
    await scoreDoc.save();
  }

  res.json({ correct });
});

module.exports = router;
