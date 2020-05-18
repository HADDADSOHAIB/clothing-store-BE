const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const Email=require('./../utils/email');
// const crypto=require('crypto');

const signToken = (id) => jwt.sign({ id }, 'my-app-is-good-should-good-that-me-ok', { expiresIn: '30d' });

exports.signup = catchAsync(async (req, res) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    return res.status(400).json({
      status: 'Failure',
      message: 'Password confirmation is not a match',
    });
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
  if (req.cookies.token_user) token = req.cookies.token_user;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await db.User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('This account does not exist, login again', 401));
  }

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User changed password, please login again', 401));
  }
  req.user = freshUser;
  return next();
});

exports.restrictTo = (...roles) => catchAsync(async (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError('You do not have permission to perform this action', 403));
  }
  return next();
});

// exports.isLoggedIn=catchAsync(async (req,res,next)=>{
//     let token = req.cookies.token_user;

//     if(token){
//         const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
//         const freshUser=await User.findById(decoded.id);
//         if(!freshUser || freshUser.changedPasswordAfter(decoded.iat)) next();

//         res.locals.user=freshUser;
//         next();
//     }
//     next();
// });

// exports.protectView=catchAsync(async (req,res,next)=>{
//     if(res.locals.user){
//         next();
//     }else{
//        res.redirect(401,`${req.protocol}://${req.get('host')}/`);
//     }
// });

// exports.forgotPassword = catchAsync(async (req, res, next)=>{
//     const user=await User.findOne({email:req.body.email});
//     if(!user){
//         return next(new AppError('No user with the provided address',404));
//     }
//     const restToken = user.createPasswordRestToken();
//     await user.save({ validateBeforeSave: false });

//     try{
//         const resetURL=`${req.protocol}://${req.get('host')}/reset-password/${restToken}`;
//         await new Email(user, resetURL).sendPasswordRest();
//         res.status(200).json({
//             status:'success',
//             message:'Token sent to email successfully, check your inbox'
//         });
//     }
//     catch(err){
//         user.passwordRestToken=undefined;
//         user.passwordRestExpires=undefined;
//         await user.save({validateBeforeSave:false});
//         return next(new AppError('there was an error sending the email, try later.',500));
//     }

// });

// exports.restPassword = catchAsync( async(req,res,next)=>{
//     const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
//     const user= await User.findOne({
// passwordRestToken: hashedToken,
// passwordRestExpires:{$gt: Date.now()}});

//     if(!user){
//         return next(new AppError('Token Invalid or Expires, send another reset request',400));
//     }
//     user.password = req.body.password;
//     user.confirmPassword = req.body.confirmPassword;
//     user.passwordRestToken = undefined;
//     user.passwordRestExpires = undefined;
//     await user.save();

//     const token=signToken(user._id);
//     res.status(200).json({
//         status:'success',
//         token
//     })
// });

// exports.updatePassword=catchAsync(async (req, res, next)=>{
//     const user=await User.findById(req.user.id).select('+password');
//     if(!(await user.correctPassword(req.body.oldPassword,user.password))){
//         return next(new AppError('the password is wrong.',401));
//     }
//     user.password=req.body.password;
//     user.confirmPassword=req.password.confirmPassword;
//     await user.save();

//     const token=signToken(user._id);
//     res.status(200).json({
//         status:'success',
//         token
//     });
// });
