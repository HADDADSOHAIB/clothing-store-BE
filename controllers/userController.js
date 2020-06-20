const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.updateMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { firstName, lastName, phoneNumber } = req.body;

  const result = await db.User.update(
    {
      firstName,
      lastName,
      phoneNumber,
    },
    { where: { id } }
  );
  if (!result[0]) return next(new AppError('Record not found', 404));

  return res.status(200).json({
    message: 'success',
    data: result,
  });
});
