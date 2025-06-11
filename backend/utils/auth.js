// function requireLogin(req, res, next) {
//   if (!req.session.userId) return res.status(401).json({ error: 'Login required' });
//   next();
// }
// module.exports = { requireLogin };

// backend/utils/auth.js
function requireLogin(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

module.exports = { requireLogin };