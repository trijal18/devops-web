// const express = require('express');
// const Score = require('../models/Score');
// const User = require('../models/User');
// const router = express.Router();

// router.get('/', async (req, res) => {
//   const top = await Score.aggregate([
//     { $group: { _id: "$user_id", total: { $sum: "$score" } } },
//     { $sort: { total: -1 } },
//     { $limit: 10 }
//   ]);

//   const leaderboard = await Promise.all(top.map(async ({ _id, total }) => {
//     const user = await User.findById(_id);
//     return { username: user.username, score: total };
//   }));

//   res.json({ leaderboard });
// });

// module.exports = router;

// backend/routes/leaderboard.js
const express = require('express');
const Score = require('../models/Score');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
  const top = await Score.aggregate([
    { $group: { _id: "$user_id", total: { $sum: "$score" } } },
    { $sort: { total: -1 } },
    { $limit: 10 }
  ]);

  const leaderboard = await Promise.all(top.map(async ({ _id, total }) => {
    const user = await User.findById(_id);
    return { username: user.username, score: total };
  }));

  res.json({ leaderboard });
});

module.exports = router;
