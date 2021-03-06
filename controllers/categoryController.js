const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createCategory = catchAsync(async (req, res) => {
  const category = await db.Category.create({ name: req.body.name });
  return res.status(201).json({
    message: 'success',
    data: category,
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await db.Category.findByPk(req.params.id, { include: ['products'] });

  if (!category) return next(new AppError('Record not found', 404));

  return res.status(200).json({
    message: 'success',
    data: category,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const result = await db.Category.update(
    { name: req.body.name },
    { where: { id: req.params.id } },
  );

  if (!result[0]) return next(new AppError('Record not found', 404));

  return res.status(200).json({
    message: 'success',
    data: result,
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const result = await db.Category.destroy({ where: { id: req.params.id } });

  if (!result) return next(new AppError('Record not found', 404));

  return res.status(200).json({
    message: 'success',
    data: result,
  });
});

exports.getAllCategory = catchAsync(async (req, res) => {
  const categories = await db.Category.findAll({ include: ['products'] });

  return res.status(200).json({
    message: 'success',
    data: categories,
  });
});
