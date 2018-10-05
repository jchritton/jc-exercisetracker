const express = require('express');
const randomstring = require('randomstring');

const router = express.Router();

const User = require('../../db/models/User');
const Exercise = require('../../db/models/Exercise');

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
      res.json(err);
    });
  } else {
    // User is not created if the userName field is invalid
    res.json({ error: 'User not created. Please POST a valid username to create a new user!' });
  }
});

router.post('/api/exercise/add', (req, res) => {
  res.statusCode = 200;

  if (req.body.userId && req.body.description) {
    Exercise.create({
      userId: req.body.userId,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date
    }).then((exercise) => {
      res.json(exercise);
    }).catch((err) => {
      res.json(err);
    });
  } else {
    // Exercise not added if userId and description not valid
    res.json({ error: 'Exercise not added. Please POST a valid userId and description!' });
  }
});

router.get('/api/exercise/log', (req, res) => {
  res.statusCode = 200;

  // Check for existing userId

  // Search range of dates

  // Only return the first LIMIT values
});

module.exports = router;
