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
