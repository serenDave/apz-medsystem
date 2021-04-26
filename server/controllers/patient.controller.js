const dbMethods = require('../utils/db/dbHandlerFactory');
const Patient = require('../models/Patient');
const catchError = require('../utils/errors/catchErrorAsync');

exports.getAllPatients = dbMethods.getAll(Patient, ['wardId', 'deliveryReason']);
exports.getSinglePatient = dbMethods.getOne(Patient, ['wardId', 'iotDeviceId', 'deliveryReason']);
exports.createPatient = dbMethods.createOne(Patient, ['deliveryReason']);
exports.updatePatient = dbMethods.updateOne(Patient);
exports.deletePatient = dbMethods.deleteOne(Patient);
exports.deletePatients = dbMethods.deleteMany(Patient);

exports.setIgnorePatient = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { ignore } = req.body;

  const patient = await (Patient.findById(id).populate('iotDeviceId'));

  if (patient) {
    patient.iotDeviceId.ignored = ignore;
    await patient.iotDeviceId.save();

    return res.status(200).json({
      status: 'success',
      data: { patient }
    });
  } else {
    return next('Couldn\'t find patient');
  }
});