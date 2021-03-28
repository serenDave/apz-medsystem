const express = require('express');
const router = express.Router();

const patientRouter = require('./patient.routes');
const wardRouter = require('./ward.routes');
const requestRouter = require('./request.routes');
const doctorRouter = require('./doctor.routes');
const iotDeviceRouter = require('./iotdevice.routes');
const userRouter = require('./user.routes');

router.use('/patients', patientRouter);
router.use('/wards', wardRouter);
router.use('/requests', requestRouter);
router.use('/iotdevices', iotDeviceRouter);
router.use('/doctors', doctorRouter);
router.use('/users', userRouter);
  
module.exports = router;