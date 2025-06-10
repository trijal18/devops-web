const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  file_path: String,
  summary: String,
  questions: Array,
  filename: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('PDF', pdfSchema);
