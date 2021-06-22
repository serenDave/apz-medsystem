const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patient.controller');
const AuthController = require('../controllers/auth.controller');

router.route('/')
  .get(PatientController.getAllPatients)
  .post(AuthController.protect, PatientController.createPatient);

router.use(AuthController.protect);

router.post('/delete-many', PatientController.deletePatients);

router
  .route('/:id')
  .get(PatientController.getSinglePatient)
  .patch(PatientController.updatePatient)
  .delete(PatientController.deletePatient);

router.patch('/ignore/:id', PatientController.setIgnorePatient);

module.exports = router;
