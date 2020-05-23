module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  }, {});
  // eslint-disable-next-line func-names
  CartItem.associate = function (models) {
    CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
    CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
  };
  return CartItem;
};
