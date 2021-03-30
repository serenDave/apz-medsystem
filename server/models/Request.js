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
  },
  status: {
    type: String,
    enum: ['opened', 'resolved'],
    default: 'opened'
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;