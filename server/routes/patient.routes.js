const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patient.controller');

router.route('/')
  .get(PatientController.getAllPatients)
  .post(PatientController.createPatient);

router
  .route('/:id')
  .get(PatientController.getSinglePatient)
  .patch(PatientController.updatePatient)
  .delete(PatientController.deletePatient);

module.exports = router;
