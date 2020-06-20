const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.route('/:id').get(orderController.getOrder).patch(orderController.updateOrder);
router.route('/').post(orderController.createOrder).get(orderController.getOrders);

module.exports = router;
