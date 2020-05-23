const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createItem = catchAsync(async (req, res, next) => {
  const cart = await db.Cart.findByPk(req.params.id);

  if (!cart) return next(new AppError('Cart not found', 404));

  const newItem = await db.CartItem.create({
    productId: req.body.productId,
    cartId: cart.id,
    price: req.body.price,
    quantity: 1,
  });

  return res.status(201).json({
    message: 'Success',
    data: newItem,
  });
});

exports.increaseQuantity = catchAsync(async (req, res, next) => {
  const cartItem = await db.CartItem.findByPk(req.params.id);

  if (!cartItem) return next(new AppError('Cart Item not found', 404));
  cartItem.quantity += 1;
  cartItem.save();

  return res.status(200).json({
    message: 'Success',
    data: cartItem,
  });
});

exports.decreaseQuantity = catchAsync(async (req, res, next) => {
  const cartItem = await db.CartItem.findByPk(req.params.id);

  if (!cartItem) return next(new AppError('Cart Item not found', 404));

  cartItem.quantity -= 1;
  if (cartItem.quantity === 0) {
    await cartItem.destroy();
  } else {
    await cartItem.save();
  }

  return res.status(200).json({
    message: 'Success',
    data: cartItem,
  });
});
