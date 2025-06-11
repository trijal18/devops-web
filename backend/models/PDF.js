// const mongoose = require('mongoose');

// const pdfSchema = new mongoose.Schema({
//   file_path: String,
//   summary: String,
//   questions: Array,
//   filename: String,
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

// module.exports = mongoose.model('PDF', pdfSchema);

// backend/models/PDF.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const pdfSchema = new mongoose.Schema({
  file_path: String,
  filename: String,
  summary: String,
  questions: [questionSchema],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PDF', pdfSchema);