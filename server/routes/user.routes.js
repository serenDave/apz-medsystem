const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const AuthController = require('../controllers/auth.controller');

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);


router.use(AuthController.protect);

router.route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getSingleUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

router.post('/delete-many', UserController.deleteUsers);

module.exports = router;
