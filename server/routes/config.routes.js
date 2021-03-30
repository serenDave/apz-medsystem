const express = require('express');
const router = express.Router();

const ConfigController = require('../controllers/config.controller');

router
  .route('/:id')
  .get(ConfigController.getConfig)
  .patch(ConfigController.updateConfig);

module.exports = router;