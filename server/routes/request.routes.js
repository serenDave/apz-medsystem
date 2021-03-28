const express = require('express');
const router = express.Router();

const RequestController = require('../controllers/request.controller');

router.route('/')
  .get(RequestController.getAllRequests)
  .post(RequestController.createRequest);

router
  .route('/:id')
  .get(RequestController.getSingleRequest)
  .patch(RequestController.updateRequest)
  .delete(RequestController.deleteRequest);

module.exports = router;
