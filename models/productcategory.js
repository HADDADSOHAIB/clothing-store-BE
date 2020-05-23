module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
  });
  // eslint-disable-next-line func-names
  ProductCategory.associate = function (models) {
    ProductCategory.belongsTo(models.Product, { foreignKey: 'productId' });
    ProductCategory.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };
  return ProductCategory;
};
