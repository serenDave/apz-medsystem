const mongoose = require('mongoose');

const deliveryReasonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nameReadable: {
    type: String,
    required: true
  }
});

const DeliveryReason = mongoose.model('DeliveryReason', deliveryReasonSchema);

module.exports = DeliveryReason;
