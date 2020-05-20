module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
  }, {});
  // eslint-disable-next-line func-names
  Category.associate = function (models) {
    Category.belongsToMany(models.Category, {
      through: 'ProductCategory',
      as: 'products',
      foreignKey: 'categoryId',
      otherKey: 'productId',
    });
    Category.hasMany(models.ProductCategory, {
      foreignKey: 'categoryId',
    });
  };

  Category.beforeValidate((category) => {
    // eslint-disable-next-line no-param-reassign
    category.name = category.name.toLowerCase().trim();
  });

  return Category;
};
