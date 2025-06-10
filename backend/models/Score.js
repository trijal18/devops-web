const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pdf_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PDF' },
  score: Number,
});

module.exports = mongoose.model('Score', scoreSchema);
