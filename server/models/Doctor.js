const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: [30, "Doctors's full name can't be more than 30 characters"],
  },
  speciality: {
    type: String,
    required: [true, 'Doctor must have a speciality'],
  },
  status: {
    type: String,
    default: 'free',
    enum: ['occupied', 'free']
  },
  patients: [mongoose.Schema.Types.ObjectId]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;