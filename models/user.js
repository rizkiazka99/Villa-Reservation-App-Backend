'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Booking);
      User.hasMany(models.VillaReview);
      User.hasMany(models.Favorite);
    }
  }
  User.init({
    email: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encryptPassword(user.password),
        user.role = 'User'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};