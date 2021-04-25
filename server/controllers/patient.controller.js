const dbMethods = require('../utils/db/dbHandlerFactory');
const Patient = require('../models/Patient');

exports.getAllPatients = dbMethods.getAll(Patient, ['wardId', 'deliveryReason']);
exports.getSinglePatient = dbMethods.getOne(Patient, ['wardId', 'iotDeviceId', 'deliveryReason']);
exports.createPatient = dbMethods.createOne(Patient, ['deliveryReason']);
exports.updatePatient = dbMethods.updateOne(Patient);
exports.deletePatient = dbMethods.deleteOne(Patient);
exports.deletePatients = dbMethods.deleteMany(Patient);