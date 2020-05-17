const express = require('express');
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router
  .route('/:id/quantity')
  .patch(productController.addQuantity);
router
  .route('/:id/reviews')
  .post(reviewController.createReview);
router
  .route('/:id')
  .get(productController.getProduct);
router
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

module.exports = router;
