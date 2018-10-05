const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  userId: String,
  description: String,
  duration: Number,
  date: Date
});

const Exercise = mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
