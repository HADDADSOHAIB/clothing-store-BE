const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
