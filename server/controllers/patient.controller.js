const dbMethods = require('../utils/db/dbHandlerFactory');
const Patient = require('../models/Patient');

exports.getAllPatients = dbMethods.getAll(Patient);
exports.getSinglePatient = dbMethods.getOne(Patient);
exports.createPatient = dbMethods.createOne(Patient);
exports.updatePatient = dbMethods.updateOne(Patient);
exports.deletePatient = dbMethods.deleteOne(Patient);