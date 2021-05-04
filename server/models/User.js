const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'doctor', 'admin'],
    default: 'user',
    required: true
  },
  deviceIdToken: String,
  doctorId: mongoose.Schema.Types.ObjectId
});

const User = mongoose.model('User', userSchema);

module.exports = User;