const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => jwt.sign({ id }, 'my-app-is-good-should-good-that-me-ok', { expiresIn: '30d' });

exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    return next(new AppError('Password confirmation is not a match', 400));
  }

  const email = await db.User.findOne({ where: { userEmail: req.body.userEmail } });
  if (email) {
    return next(new AppError('Email already exist', 400));
  }

  const name = await db.User.findOne({ where: { userName: req.body.userName } });
  if (name) {
    return next(new AppError('User name already exist', 400));
  }

  const newUser = await db.User.create({
    userEmail: req.body.userEmail,
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    role: 'user',
    password: req.body.password,
  });

  const token = signToken(newUser.id);
  await db.Cart.create({ userId: newUser.id });

  return res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { userEmail, password } = req.body;
  if (!userEmail || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await db.User.findOne({ where: { userEmail } });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user.id);

  return res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await db.User.findByPk(decoded.id);

  if (!freshUser) {
    return next(new AppError('This account does not exist, login again', 401));
  }

  req.user = freshUser;
  return next();
});

exports.restrictTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    return next();
  });

exports.getUserByToken = catchAsync(async (req, res, next) => {
  const { token } = req.body;

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await db.User.findByPk(decoded.id);

  if (!freshUser) {
    return next(new AppError('This account does not exist, login again', 401));
  }

  return res.status(200).json({
    status: 'success',
    data: freshUser,
  });
});
