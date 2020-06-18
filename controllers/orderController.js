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
