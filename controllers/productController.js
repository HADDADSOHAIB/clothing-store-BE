/* eslint-disable no-unused-vars */
const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const queryBuilder = require('../utils/productQueryBuilder');

exports.getProducts = catchAsync(async (req, res) => {
  const queryObj = queryBuilder(req.query);
  const products = await db.Product.findAll(queryObj);

  return res.status(200).json({
    message: 'success',
    data: products,
  });
});

exports.productCount = catchAsync(async (req, res, next) => {
  const countQuery = await db.Product.findAll({
    attributes: [[db.sequelize.fn('count', db.sequelize.col('name')), 'count']],
  });

  return res.status(200).json({
    message: 'success',
    data: countQuery[0],
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await db.Product.findByPk(req.params.id, {
    include: ['categories', {
      model: db.ProductReview,
      as: 'reviews',
      include: ['user'],
    }],
  });

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
  const {
    name,
    description,
    price,
    coverImage,
    images,
    categories,
  } = req.body;

  const product = await db.Product.create({
    name,
    description,
    price,
    quantity: 0,
    rating: 5,
    coverImage,
    images,
  });

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

exports.updateProduct = catchAsync(async (req, res, next) => {
  const {
    id,
    name,
    description,
    price,
    coverImage,
    images,
    categories,
  } = req.body;

  const result = await db.Product.update(
    {
      name,
      description,
      price,
      coverImage,
      images,
    },
    { where: { id } },
  );

  if (!result[0]) return next(new AppError('Record not found', 404));

  await db.ProductCategory.destroy({ where: { productId: id } });
  if (categories) {
    categories.forEach(async (el) => {
      await db.ProductCategory.create({ productId: id, categoryId: el.id });
    });
  }

  return res.status(200).json({
    message: 'success',
    data: result,
  });
});
