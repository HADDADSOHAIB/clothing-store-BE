const db = require('../models/index');

const { Op } = db.Sequelize;

module.exports = (query) => {
  const {
    page,
    size,
    order,
    dir,
    categories,
    priceu,
    priced,
    search,
  } = query;

  const queryObj = {};

  if (page && size) {
    queryObj.offset = (parseInt(page, 10) - 1) * parseInt(size, 10);
    queryObj.limit = parseInt(size, 10);
  }
  if (order && dir) {
    queryObj.order = [[order, dir]];
  }
  if (categories) {
    queryObj.include = [
      {
        model: db.Category,
        as: 'categories',
        attributes: ['id', 'name'],
        where: {
          [Op.or]: categories.split(',').map((el) => ({ id: parseInt(el, 10) })),
        },
      },
    ];
  }
  if (priced || priceu) {
    if (priced && priceu) {
      queryObj.where = {
        price: {
          [Op.between]: [parseInt(priced, 10), parseInt(priceu, 10)],
        },
      };
    } else if (priceu) {
      queryObj.where = {
        price: {
          [Op.lte]: [parseInt(priceu, 10)],
        },
      };
    } else if (priced) {
      queryObj.where = {
        price: {
          [Op.gte]: [parseInt(priced, 10)],
        },
      };
    }
  }

  if (search) {
    queryObj.where = {
      ...queryObj.where,
      name: {
        [Op.like]: {
          [Op.any]: search.split(' ').map((el) => `%${el}%`),
        },
      },
    };
  }

  return queryObj;
};
