const express = require('express');
const router = express.Router();

const DoctorController = require('../controllers/doctor.controller');

router.route('/')
  .get(DoctorController.getAllDoctors)
  .post(DoctorController.createDoctor);

router.post('/add-doctor', DoctorController.addDoctor);

router
  .route('/:id')
  .get(DoctorController.getSingleDoctor)
  .patch(DoctorController.updateDoctor)
  .delete(DoctorController.deleteDoctor);

router.post('/delete-many', DoctorController.deleteDoctors);

module.exports = router;
