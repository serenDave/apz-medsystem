const dbMethods = require('../utils/db/dbHandlerFactory');
const Doctor = require('../models/Doctor');

exports.getAllDoctors = dbMethods.getAll(Doctor);
exports.getSingleDoctor = dbMethods.getOne(Doctor);
exports.createDoctor = dbMethods.createOne(Doctor);
exports.updateDoctor = dbMethods.updateOne(Doctor);
exports.deleteDoctor = dbMethods.deleteOne(Doctor);