'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User);
      Booking.belongsTo(models.Villa);
    }
  }
  Booking.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    UserId: DataTypes.INTEGER,
    VillaId: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    booking_start_date: DataTypes.INTEGER,
    booking_end_date: DataTypes.INTEGER,
    payment: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};