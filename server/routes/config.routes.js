const express = require('express');
const router = express.Router();

const ConfigController = require('../controllers/config.controller');
const AuthController = require('../controllers/auth.controller');

router.use(AuthController.protect);

router
  .route('/:id')
  .get(ConfigController.getConfig)
  .patch(ConfigController.updateConfig);

router.post('/make-backup', ConfigController.makeBackup);

module.exports = router;