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
  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      as: 'items',
    });
  };
  return Order;
};
