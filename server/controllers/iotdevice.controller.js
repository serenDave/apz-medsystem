const dbMethods = require('../utils/db/dbHandlerFactory');
const IoTDevice = require('../models/IoTDevice');

exports.getAllIoTDevices = dbMethods.getAll(IoTDevice);
exports.getSingleIoTDevice = dbMethods.getOne(IoTDevice);
exports.createIoTDevice = dbMethods.createOne(IoTDevice);
exports.updateIoTDevice = dbMethods.updateOne(IoTDevice);
exports.deleteIoTDevice = dbMethods.deleteOne(IoTDevice);