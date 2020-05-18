const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true,
        isUnique(value) {
          return User.findOne({ where: { userEmail: value } })
            .then((res) => {
              if (res) {
                throw new Error('Email already exist');
              }
            });
        },
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isUnique(value) {
          return User.findOne({ where: { userName: value } })
            .then((res) => {
              if (res) {
                throw new Error('User name already exist');
              }
            });
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        notNull: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [6, 30],
      },
    },
  },
  {});

  User.prototype
    .correctPassword = async (candidatPass, userPass) => bcrypt.compare(candidatPass, userPass);

  User.associate = function (models) {
    User.hasMany(models.ProductReview, {
      as: 'reviews',
      foreignKey: 'userId',
    });

    User.hasOne(models.Cart, {
      as: 'cart',
      foreignKey: 'userId',
    });
  };

  User.beforeSave(async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = await bcrypt.hash(user.password, 12);
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      // eslint-disable-next-line no-param-reassign
      user.password = await bcrypt.hash(user.password, 12);
    }
  });
  return User;
};
