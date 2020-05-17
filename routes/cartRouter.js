const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.route('/:id').get(cartController.getCart);

module.exports = router;
