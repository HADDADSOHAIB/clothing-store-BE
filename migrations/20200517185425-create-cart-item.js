module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CartItems', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    cartId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts',
        key: 'id',
      },
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('CartItems'),
};
