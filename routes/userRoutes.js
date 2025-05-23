const express = require('express')
const router = express.Router();
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword',authController.forgotPassword)
router.patch('/resetPassword/:token',authController.resetPassword)

router.route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route("/:id")
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .patch(userController.updateUser)

module.exports = router;