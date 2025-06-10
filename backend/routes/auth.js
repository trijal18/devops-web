const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ error: 'Email already registered' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });
  req.session.userId = user._id;
  res.json({ success: true });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) return res.status(401).json({ error: 'Invalid credentials' });
  req.session.userId = user._id;
  res.json({ success: true });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;
