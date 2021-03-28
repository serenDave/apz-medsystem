const dbMethods = require('../utils/db/dbHandlerFactory');
const Request = require('../models/Request');

exports.getAllRequests = dbMethods.getAll(Request);
exports.getSingleRequest = dbMethods.getOne(Request);
exports.createRequest = dbMethods.createOne(Request);
exports.updateRequest = dbMethods.updateOne(Request);
exports.deleteRequest = dbMethods.deleteOne(Request);
