const express = require('express');
const router = express.Router();

const DeliveryReasonController = require('../controllers/deliveryreason.controller');

router.route('/').get(DeliveryReasonController.getDeliveryReasons);

module.exports = router;
