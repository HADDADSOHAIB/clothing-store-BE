const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/:id', productController.getProduct);
router
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

module.exports = router;
