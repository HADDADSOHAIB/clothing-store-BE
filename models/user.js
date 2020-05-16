'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userEmail: DataTypes.STRING,
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};