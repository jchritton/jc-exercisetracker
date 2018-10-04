const express = require('express');
const randomstring = require('randomstring');

const router = express.Router();

const User = require('../../db/models/User');

router.get('/', (req, res) => {
  res.send('Exercise tracker index page!');
});

router.post('/api/exercise/new-user', (req, res) => {
  res.statusCode = 200;

  // Check that the request has a valid userName value
  if (req.body.userName) {
    // Create a new user and return the record information
    User.create({
      id: randomstring.generate(6),
      userName: req.body.userName
    }).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json({ error: err });
    });
  } else {
    // User is not created if the userName field is invalid
    res.json({ error: 'User not created. Please POST a valid username to create a new user!' });
  }
});

module.exports = router;
