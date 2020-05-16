const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getProduct = catchAsync(async (req, res) => {
  const products = await db.Product.findAll();
  console.log(products);
  return res.status(200).json({
    message: 'success',
    data: products,
  });
});