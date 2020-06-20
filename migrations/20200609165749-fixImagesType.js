module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn(
      'Products',
      'coverImage',
    ),
    queryInterface.removeColumn(
      'Products',
      'images',
    ),
    queryInterface.addColumn(
      'Products',
      'coverImage',
      {
        type: Sequelize.TEXT,
      },
    ),
    queryInterface.addColumn(
      'Products',
      'images',
      {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
    ),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
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
