const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', 'config/.env')
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const index = require('./routes');

const app = express();

// Allow CORS requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Port setup
const port = process.env.PORT || 8080;

// Set up directory for static served files
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// Set up index as router on root
app.use('/', index);

// Start server
if (!module.parent) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Express server is listening on port ${port}`);
  });
}

module.exports = app;
