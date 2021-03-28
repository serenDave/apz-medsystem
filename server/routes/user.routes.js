const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.route('/').get(UserController.getAllUsers).post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getSingleUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
