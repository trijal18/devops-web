// module.exports = router;

const express = require('express');
const PDF = require('../models/PDF');
const Score = require('../models/Score');
const { requireLogin } = require('../utils/auth');
const router = express.Router();

/**
 * Step 1: Get summary and quiz together (for /quiz/:pdf_id)
 */
router.get('/:pdf_id', requireLogin, async (req, res) => {
  const pdf = await PDF.findById(req.params.pdf_id);
  if (!pdf) return res.status(404).json({ error: 'PDF not found' });

  // Clear previous score for this quiz & user (optional)
  await Score.deleteOne({ pdf_id: pdf._id, user_id: req.session.userId });

  res.json({
    summary: pdf.summary,
    questions: pdf.questions.map((q, i) => ({
      index: i,
      question: q.question,
      options: q.options,
    })),
  });
});

/**
 * Step 2: Submit answer to a question
 */
router.post('/answer', requireLogin, async (req, res) => {
  const { pdf_id, index, selected_option } = req.body;

  const pdf = await PDF.findById(pdf_id);
  if (!pdf) return res.status(404).json({ error: 'PDF not found' });

  const question = pdf.questions[index];
  if (!question) return res.status(400).json({ error: 'Invalid question index' });

  const correct = question.answer.trim() === selected_option.trim();

  let scoreDoc = await Score.findOne({ pdf_id, user_id: req.session.userId });
  if (!scoreDoc) {
    scoreDoc = await Score.create({ pdf_id, user_id: req.session.userId, score: 0 });
  }

  if (correct) {
    scoreDoc.score += 1;
    await scoreDoc.save();
  }

  res.json({ correct });
});

/**
 * Step 3: After quiz, fetch result
 */
router.get('/:pdf_id/result', requireLogin, async (req, res) => {
  const scoreDoc = await Score.findOne({
    pdf_id: req.params.pdf_id,
    user_id: req.session.userId,
  });

  if (!scoreDoc) {
    return res.status(404).json({ error: 'No score found. Did you attempt the quiz?' });
  }

  const pdf = await PDF.findById(req.params.pdf_id);
  const total = pdf?.questions?.length || 0;

  res.json({
    score: scoreDoc.score,
    total,
  });
});

module.exports = router;