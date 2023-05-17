'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Villa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Villa.hasMany(models.Booking);
      Villa.hasMany(models.VillaReview);
      Villa.hasMany(models.VillaGalery);
      Villa.belongsTo(models.Location);
      Villa.hasMany(models.Favorite);
    }
  }
  Villa.init({
    LocationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING(2048),
    price: DataTypes.INTEGER,
    map_url: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    bedroom: DataTypes.INTEGER,
    bathroom: DataTypes.INTEGER,
    swimming_pool: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Villa',
  });
  return Villa;
};