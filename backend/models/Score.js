// const mongoose = require('mongoose');

// const scoreSchema = new mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   pdf_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PDF' },
//   score: Number,
// });

// module.exports = mongoose.model('Score', scoreSchema);

// backend/models/Score.js
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  pdf_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PDF' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);