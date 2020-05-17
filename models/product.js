
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      max: 5,
      min: 0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

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

  return Product;
};
