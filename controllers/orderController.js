const db = require('../models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    userId,
    shippingInfos,
    orderDate,
    processedDate,
    inRouteDate,
    deliveryDate,
    deliveryConfirmationDate,
    cancelationDate,
    orderItems,
  } = req.body;
  const order = await db.Order.create({
    userId,
    shippingInfos,
    orderDate,
    processedDate,
    inRouteDate,
    deliveryDate,
    deliveryConfirmationDate,
    cancelationDate,
  });

  orderItems.map(async (orderItem) => {
    const { productId, name, quantity, price } = orderItem;

    await db.OrderItem.create({
      productId,
      orderId: order.id,
      name,
      quantity,
      price,
    });
  });
  return res.status(200).json({
    message: 'success',
    data: {
      order,
      items: orderItems.map((item) => ({ ...item, orderId: order.id })),
    },
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await db.Order.findAll({
    include: ['user', 'items'],
    order: [['orderDate', 'DESC']],
  });

  return res.status(200).json({
    message: 'success',
    data: orders,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await db.Order.findByPk(req.params.id, {
    include: ['user', 'items'],
  });

  if (!order) {
    return next(new AppError('Record not found', 404));
  }

  return res.status(200).json({
    message: 'success',
    data: order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const {
    id,
    shippingInfos,
    processedDate,
    inRouteDate,
    deliveryDate,
    deliveryConfirmationDate,
    cancelationDate,
  } = req.body;

  const result = await db.Order.update(
    {
      shippingInfos,
      processedDate,
      inRouteDate,
      deliveryDate,
      deliveryConfirmationDate,
      cancelationDate,
    },
    { where: { id } }
  );

  if (!result[0]) return next(new AppError('Record not found', 404));

  return res.status(200).json({
    message: 'success',
    data: result,
  });
});
