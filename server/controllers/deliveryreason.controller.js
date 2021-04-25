const dbMethods = require('../utils/db/dbHandlerFactory');
const DeliveryReason = require('../models/DeliveryReason');

exports.getDeliveryReasons = dbMethods.getAll(DeliveryReason);
