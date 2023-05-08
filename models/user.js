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
      User.belongsToMany(models.Villa, { through: models.Booking });
      User.belongsToMany(models.Villa, { through: models.VillaReview });
      User.hasMany(models.Favorite);
    }
  }
  User.init({
    email: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_picture: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encryptPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};