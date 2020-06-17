module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    shippingInfos: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    orderDate: DataTypes.DATE,
    processedDate: DataTypes.DATE,
    inRouteDate: DataTypes.DATE,
    deliveryDate: DataTypes.DATE,
    deliveryConfirmationDate: DataTypes.DATE,
    cancelationDate: DataTypes.DATE,
  }, {});
  return Order;
};
