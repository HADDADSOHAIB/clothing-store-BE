const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getCartByUser = catchAsync(async (req, res, next) => {
  const cart = await db.Cart.findOne({
    where: { userId: req.params.id },
    include: ['items'],
  });

  if (!cart) {
    return next(new AppError('Record not found', 404));
  }
  return res.status(200).json({
    message: 'success',
    data: cart,
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await db.Cart.findByPk(req.params.id, {
    include: ['items'],
  });

  if (!cart) {
    return next(new AppError('Record not found', 404));
  }
  return res.status(200).json({
    message: 'success',
    data: cart,
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const cart = await db.Cart.findByPk(req.params.id, {
    include: ['items'],
  });

  if (!cart) {
    return next(new AppError('Record not found', 404));
  }
  cart.items.forEach((item) => item.destroy());
  cart.items = [];

  return res.status(200).json({
    message: 'success',
    data: cart,
  });
});
