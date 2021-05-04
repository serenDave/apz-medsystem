const dbMethods = require('../utils/db/dbHandlerFactory');
const Ward = require('../models/Ward');

exports.getAllWards = dbMethods.getAll(Ward);
exports.getSingleWard = dbMethods.getOne(Ward);
exports.createWard = dbMethods.createOne(Ward);
exports.updateWard = dbMethods.updateOne(Ward);
exports.deleteWard = dbMethods.deleteOne(Ward);