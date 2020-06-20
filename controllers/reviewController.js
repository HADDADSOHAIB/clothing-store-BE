const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createReview = catchAsync(async (req, res, next) => {
  const product = await db.Product.findByPk(req.params.id);
  if (!product) {
    return next(new AppError('Record not found', 404));
  }

  const { userId, review, rating } = req.body;
  const newReview = await db.ProductReview.create({
    userId,
    productId: product.id,
    review,
    rating,
  });

  await product.updateRatings();
  return res.status(201).json({
    message: 'success',
    data: newReview,
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

// eslint-disable-next-line no-unused-vars
exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await db.ProductReview.findAll({
    include: ['product'],
    where: { userId: req.user.id },
  });

  return res.status(200).json({
    message: 'success',
    data: reviews,
  });
});
