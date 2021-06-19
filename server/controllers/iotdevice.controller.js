const dbMethods = require('../utils/db/dbHandlerFactory');
const IoTDevice = require('../models/IoTDevice');
const Patient = require('../models/Patient');
const catchErrorAsync = require('../utils/errors/catchErrorAsync');

exports.getAllIoTDevices = catchErrorAsync(async (req, res, next) => {
  let dbQuery = IoTDevice.find();
  
  const { query } = req;
  
  if (query?.device === 'free') {
    const attachedIds = (
      await Patient.find(
        { iotDeviceId: { $exists: true } },
        { iotDeviceId: 1 }
      )
    ).map(({ iotDeviceId }) => iotDeviceId);

    dbQuery = IoTDevice.find({ _id: { $nin: attachedIds }});
  }

  const iotDevices = await dbQuery;

  res.json({
    status: 'success',
    results: iotDevices.length,
    data: { docs: iotDevices }
  });
});

exports.getSingleIoTDevice = dbMethods.getOne(IoTDevice);
exports.createIoTDevice = dbMethods.createOne(IoTDevice);
exports.updateIoTDevice = dbMethods.updateOne(IoTDevice);
exports.deleteIoTDevice = dbMethods.deleteOne(IoTDevice);
