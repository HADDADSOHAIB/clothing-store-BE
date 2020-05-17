const express = require('express');
const cartController = require('../controllers/cartController');
const cartItemController = require('../controllers/cartItemController');

const router = express.Router();

router.route('/:id/items').post(cartItemController.createItem);
router.route('/:id').get(cartController.getCart);

module.exports = router;
