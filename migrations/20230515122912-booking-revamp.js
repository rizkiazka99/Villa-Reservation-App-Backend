'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'id', {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    });
    await queryInterface.changeColumn('Bookings', 'payment', Sequelize.TEXT);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Bookings', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    });
    await queryInterface.changeColumn('Bookings', 'payment', Sequelize.STRING);
  }
};
