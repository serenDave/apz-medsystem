const logger = require('../log/logger'); 
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    logger.error(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;