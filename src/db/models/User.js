const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  userName: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
