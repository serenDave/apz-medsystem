const backup = require('mongodb-backup-4x');
const dbMethods = require('../utils/db/dbHandlerFactory');
const Config = require('../models/Config');
const catchError = require('../utils/errors/catchErrorAsync');

exports.getConfig = dbMethods.getOne(Config);
exports.updateConfig = dbMethods.updateOne(Config);

exports.makeBackup = catchError(async (req, res, next) => {
  backup({
    uri: process.env.DB_CONNECTION,
    root: `${__dirname}/../backup`,
    callback: (err) => {
      if (err) {
        return next(err.message);
      }

      return res.status(201).json({
        status: 'success',
        message: 'Backup is created'
      });
    }
  });
});