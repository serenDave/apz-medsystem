const express = require('express');
const router = express.Router();

const DeliveryReasonController = require('../controllers/deliveryreason.controller');
const AuthController = require('../controllers/auth.controller');

router.use(AuthController.protect);

router.route('/').get(DeliveryReasonController.getDeliveryReasons);

module.exports = router;
