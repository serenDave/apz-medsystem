const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  patientsCount: {
    type: Number,
    default: 0
  }
});

const Ward = mongoose.model('Ward', wardSchema);

module.exports= Ward;