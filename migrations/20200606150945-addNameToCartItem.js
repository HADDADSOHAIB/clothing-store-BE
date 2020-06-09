module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'CartItems',
    'name',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
  ),
  down: (queryInterface) => queryInterface.removeColumn(
    'CartItems',
    'name',
  ),
};
