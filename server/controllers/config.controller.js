const dbMethods = require('../utils/db/dbHandlerFactory');
const Config = require('../models/Config');

exports.getConfig = dbMethods.getOne(Config);
exports.updateConfig = dbMethods.updateOne(Config);
