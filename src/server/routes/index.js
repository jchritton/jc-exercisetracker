const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Exercise tracker index page!');
});

module.exports = router;
