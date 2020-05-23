module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {});
  // eslint-disable-next-line func-names
  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cartId',
      as: 'items',
    });
  };
  return Cart;
};
