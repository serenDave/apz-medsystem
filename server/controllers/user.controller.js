const dbMethods = require('../utils/db/dbHandlerFactory');
const User = require('../models/User');

exports.getAllUsers = dbMethods.getAll(User);
exports.getSingleUser = dbMethods.getOne(User);
exports.createUser = dbMethods.createOne(User);
exports.updateUser = dbMethods.updateOne(User);
exports.deleteUser = dbMethods.deleteOne(User);