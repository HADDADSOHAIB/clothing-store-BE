module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define('ProductReview', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      max: 5,
      min: 0,
    },
    review: {
      type: DataTypes.TEXT,
    },
  }, {});

  ProductReview.associate = function (models) {
    ProductReview.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    ProductReview.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return ProductReview;
};
