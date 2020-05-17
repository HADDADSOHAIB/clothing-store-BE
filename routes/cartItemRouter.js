const express = require('express');
const cartItemController = require('../controllers/cartItemController');

const router = express.Router();

router.route('/:id/increase').patch(cartItemController.increaseQuantity);
router.route('/:id/decrease').patch(cartItemController.decreaseQuantity);

module.exports = router;
