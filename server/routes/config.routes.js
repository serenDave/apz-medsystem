const express = require('express');
const router = express.Router();

const ConfigController = require('../controllers/config.controller');

router
  .route('/:id')
  .get(ConfigController.getConfig)
  .patch(ConfigController.updateConfig);

router.post('/make-backup', ConfigController.makeBackup);

module.exports = router;