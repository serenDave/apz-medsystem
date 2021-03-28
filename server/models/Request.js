const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  requestType: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['highest', 'high', 'medium', 'low'],
    required: true
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;