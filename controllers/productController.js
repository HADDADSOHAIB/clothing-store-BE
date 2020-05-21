const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getProducts = catchAsync(async (req, res) => {
  const products = await db.Product.findAll();

  return res.status(200).json({
    message: 'success',
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await db.Product.findByPk(req.params.id, { include: ['categories', 'reviews'] });
  if (!product) {
    return next(new AppError('Record not found', 404));
  }
  return res.status(200).json({
    message: 'success',
    data: product,
  });
});

exports.addQuantity = catchAsync(async (req, res, next) => {
  const product = await db.Product.findByPk(req.params.id);
  if (!product) {
    return next(new AppError('Record not found', 404));
  }

  product.quantity += req.body.quantity;
  await product.save();

  return res.status(200).json({
    message: 'success',
    data: product,
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const product = await db.Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: 0,
    rating: 5,
  });

  const { categories } = req.body;

  if (categories) {
    categories.forEach(async (el) => {
      await db.ProductCategory.create({ productId: product.id, categoryId: el.id });
    });
  }

  return res.status(201).json({
    message: 'success',
    data: product,
  });
});
