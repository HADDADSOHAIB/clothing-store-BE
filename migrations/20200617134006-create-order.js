module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    shippingInfos: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    orderDate: {
      type: Sequelize.DATE,
    },
    processedDate: {
      type: Sequelize.DATE,
    },
    inRouteDate: {
      type: Sequelize.DATE,
    },
    deliveryDate: {
      type: Sequelize.DATE,
    },
    deliveryConfirmationDate: {
      type: Sequelize.DATE,
    },
    cancelationDate: {
      type: Sequelize.DATE,
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
  down: (queryInterface) => queryInterface.dropTable('Orders'),
};
