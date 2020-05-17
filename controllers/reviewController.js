const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createReview = catchAsync(async (req, res, next) => {
  const product = await db.Product.findByPk(req.params.id);
  if (!product) {
    return next(new AppError('Record not found', 404));
  }

  const review = await db.ProductReview.create({
    userId: 12,
    productId: product.id,
    review: req.body.review,
    rating: req.body.rating,
  });

  return res.status(201).json({
    message: 'success',
    data: review,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await db.ProductReview.findByPk(req.params.id, { include: ['product', 'user'] });
  if (!review) {
    return next(new AppError('Record not found', 404));
  }
  return res.status(200).json({
    message: 'success',
    data: review,
  });
});
