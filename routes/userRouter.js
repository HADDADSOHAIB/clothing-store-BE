const express = require('express');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router();
// const userController=require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.route('/:id/cart').get(cartController.getCartByUser);

module.exports = router;
