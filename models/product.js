/* eslint-disable no-param-reassign */
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: true,
        isNumeric: true,
      },
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        max: 5,
        min: 0,
        notNull: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
  });

  // eslint-disable-next-line func-names
  Product.associate = function (models) {
    Product.belongsToMany(models.Category, {
      as: 'categories',
      through: 'ProductCategory',
      foreignKey: 'productId',
      otherKey: 'categoryId',
    });
    Product.hasMany(models.ProductCategory, {
      foreignKey: 'productId',
    });
    Product.hasMany(models.ProductReview, {
      as: 'reviews',
      foreignKey: 'productId',
    });
    Product.hasMany(models.CartItem, {
      foreignKey: 'productId',
      as: 'cartItems',
    });
  };

  // eslint-disable-next-line func-names
  Product.prototype.updateRatings = async function () {
    const avg = await sequelize.models.ProductReview.findAll({
      where: { productId: this.id },
      attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'rating']],
    });

    this.rating = avg[0].rating;
    this.save();
  };

  Product.beforeValidate((product) => {
    product.name = product.name.toLowerCase().trim();
    if (product.description) {
      product.description = product.description.toLowerCase().trim();
    }
  });

  return Product;
};
