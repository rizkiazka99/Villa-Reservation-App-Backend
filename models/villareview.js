'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VillaReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VillaReview.belongsTo(models.User);
      VillaReview.belongsTo(models.Villa);
    }
  }
  VillaReview.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    VillaId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE,
    comment: DataTypes.STRING(1024)
  }, {
    sequelize,
    modelName: 'VillaReview',
  });
  return VillaReview;
};