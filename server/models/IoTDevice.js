const mongoose = require('mongoose');

const iotDeviceSchema = new mongoose.Schema({
  number: String,
  lighting: {
    type: Number,
    default: 800,
  },
  airCondition: {
    type: String,
    default: 'ok',
    enum: ['ok', 'middle', 'bad']
  },
  ignored: {
    type: Boolean,
    default: false
  },
});

const IoTDevice = mongoose.model('IoTDevice', iotDeviceSchema);

module.exports = IoTDevice;