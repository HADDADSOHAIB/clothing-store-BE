const express = require('express');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');
const userController = require('../controllers/userController');

const router = express.Router();
// const userController=require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/token', authController.getUserByToken);
router.route('/:id/cart').get(cartController.getCartByUser);

router.route('/updateme').patch(authController.protect, userController.updateMe);

module.exports = router;
