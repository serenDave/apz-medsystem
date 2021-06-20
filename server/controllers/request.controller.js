const Request = require('../models/Request');
const Patient = require('../models/Patient');
const IoTDevice = require('../models/IoTDevice');

const {
  processRequest,
  processDoctorTreating,
  processDoctorFinishedTreating
} = require('../services/request.service');

const dbMethods = require('../utils/db/dbHandlerFactory');
const catchError = require('../utils/errors/catchErrorAsync');

exports.getAllRequests = dbMethods.getAll(Request, ['patientId']);
exports.getSingleRequest = dbMethods.getOne(Request);
exports.createRequest = dbMethods.createOne(Request);
exports.updateRequest = dbMethods.updateOne(Request);
exports.deleteRequest = dbMethods.deleteOne(Request);
exports.deleteRequests = dbMethods.deleteMany(Request);

exports.processNewRequest = catchError(async (req, res, next) => {
  const { message, priority, deviceId, patientsData, roomData } = req.body;

  const patient = await Patient.findOneAndUpdate({ iotDeviceId: deviceId }, { ...patientsData });
  const iotDevice = await IoTDevice.findOneAndUpdate({ ...roomData });

  if (!iotDevice.ignored) {
    await processRequest(patient, message, priority);
  }

  res.status(200).json({
    ok: true
  });
});

exports.processDoctorResponse = catchError(async (req, res, next) => {
  const { isTaking, doctorId, patientId } = req.body;

  if (isTaking) {
    await processDoctorTreating(doctorId, patientId);
  }

  res.status(200).json({
    ok: true
  });
});

exports.processDoctorFinished = catchError(async (req, res, next) => {
  const { doctorId, patientId } = req.body;
  
  await processDoctorFinishedTreating(doctorId, patientId);

  res.status(200).json({
    ok: true
  });
});