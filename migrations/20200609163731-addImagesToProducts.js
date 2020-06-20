module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Products',
      'coverImage',
      {
        type: Sequelize.STRING,
      },
    ),
    queryInterface.addColumn(
      'Products',
      'images',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    ),
  ]),
  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn(
      'Products',
      'coverImage',
    ),
    queryInterface.removeColumn(
      'Products',
      'images',
    ),
  ]),
};
