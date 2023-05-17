'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    email: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (admin, options) => {
        admin.password = encryptPassword(admin.password),
        admin.role = 'Admin'
      }
    },
    modelName: 'Admin',
  });
  return Admin;
};