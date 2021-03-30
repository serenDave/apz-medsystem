const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  lowPriorityRequestsFrequency: {
    type: Number,
    required: true,
    default: 5,
  },
  highPriorityRequestsFrequency: {
    type: Number,
    required: true,
    default: 2
  }
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
