const dbMethods = require('../utils/db/dbHandlerFactory');
const catchError = require('../utils/errors/catchErrorAsync');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const AppError = require('../utils/errors/appError');

exports.getAllDoctors = dbMethods.getAll(Doctor);
exports.getSingleDoctor = dbMethods.getOne(Doctor);
exports.createDoctor = dbMethods.createOne(Doctor);
exports.updateDoctor = dbMethods.updateOne(Doctor);
exports.deleteDoctor = dbMethods.deleteOne(Doctor);
exports.deleteDoctors = catchError(async (req, res, next) => {
  for (const id of req.body.ids) {
    await Doctor.findByIdAndDelete(id);
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.addDoctor = catchError(async (req, res, next) => {
  const { fullName, speciality, username, email, password } = req.body;

  const doctor = await Doctor.create({
    fullName,
    speciality
  });

  let userDoctor;

  try {
    if (doctor) {
      userDoctor = await User.create({
        name: username,
        email,
        password,
        role: 'doctor',
        doctorId: doctor._id
      });
    }
  } catch (e) {
    return next(new AppError(e.message, 403));
  }

  if (userDoctor) {
    res.json({
      status: 'success',
      message: 'Doctor is registered',
      data: {
        doc: {
          doctor,
          user: userDoctor
        }
      }
    });
  } else {
    return next(new AppError('Failed to create a doctor', 403));
  }
});