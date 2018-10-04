const express = require('express');
const randomstring = require('randomstring');

const router = express.Router();

const User = require('../../db/models/User');

router.get('/', (req, res) => {
  res.send('Exercise tracker index page!');
});

router.get('/api/exercise/new-user', (req, res) => {
  res.statusCode = '200';
  res.send('Route exists!');
});

router.post('/api/exercise/new-user', (req, res) => {
  res.statusCode = '200';

  User.create({
    id: randomstring.generate(6),
    userName: req.body.userName
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.json({ 'error': err });
  });
});

module.exports = router;
