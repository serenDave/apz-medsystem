const express = require('express');
const router = express.Router();

const RequestController = require('../controllers/request.controller');
const AuthController = require('../controllers/auth.controller');

router.post('/new', RequestController.processNewRequest);
router.post('/doctor-response', RequestController.processDoctorResponse);
router.post('/doctor-finished', RequestController.processDoctorFinished);

router.use(AuthController.protect);

router.route('/')
  .get(RequestController.getAllRequests)
  .post(RequestController.createRequest);

router
  .route('/:id')
  .get(RequestController.getSingleRequest)
  .patch(RequestController.updateRequest)
  .delete(RequestController.deleteRequest);

router.post('/delete-many', RequestController.deleteRequests);

module.exports = router;
